import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserEntity } from '../users/entities';
import { AuthUpdateDto, AuthRegisterLoginDto, AuthEmailLoginDto } from './dto';
import { RoleEnum } from 'src/components/roles/roles.enum';
import { StatusEnum } from 'src/components/statuses/statuses.enum';
import { plainToClass } from 'class-transformer';
import { Status } from 'src/components/statuses/entities/status.entity';
import { RoleEntity } from 'src/components/roles/entities/role.entity';
import { AuthProvidersEnum } from './auth-providers.enum';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { UsersService } from 'src/components/users/users.service';
import { ForgotService } from 'src/components/forgot/forgot.service';
import { MailService } from 'src/mail/mail.service';
import { omit } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { HelperHashService } from 'src/helper/service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { createHash } from 'crypto';
import moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private forgotService: ForgotService,
    private mailService: MailService,
    private configService: ConfigService,
    private hashService: HelperHashService,
  ) {}

  /**
   *
   * @param loginDto
   * @param onlyAdmin
   * @returns
   */
  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<{ token: string; userInfo: UserEntity; expiresIn: number, expireAt: number }> {    
    const user = await this.usersService.findOne({
      where: { email: loginDto.email },
    });
    if (
      !user ||
      (user &&
        !(onlyAdmin ? [RoleEnum.admin] : [RoleEnum.user]).includes(
          user.role.id,
        ))
    ) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { provider, password, email, firstName, lastName, role } = user;
    if (provider !== AuthProvidersEnum.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: `needLoginViaProvider:${provider}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await this.hashService.bcryptCompare(
      loginDto.password,
      password,
    );

    if (isValidPassword) {
      const expiresIn = loginDto.rememberMe ? this.configService.get('auth.expireRememberMe') : this.configService.get('auth.expires');
      const options: JwtSignOptions = loginDto.rememberMe ? {expiresIn} : {};
      const token = await this.jwtService.sign({
        id: user.id,
        email,
        firstName,
        lastName,
        role,
      }, options);

      return {
        token,
        userInfo: omit(user, ['password', 'previousPassword', 'role.createdAt', 'role.updatedAt', 'status.createdAt', 'status.updatedAt']),
        expiresIn,
        expireAt: moment().add(expiresIn, 'millisecond').unix()
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'request.incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  /**
   *
   * @param authProvider
   * @param socialData
   * @returns
   */
  async validateSocialLogin(
    authProvider: string,
    socialData: SocialInterface,
  ): Promise<{ token: string; user: UserEntity }> {
    let user: UserEntity;
    const socialEmail = socialData.email?.toLowerCase();

    const userByEmail = await this.usersService.findOne({
      where: { email: socialEmail },
    });

    user = await this.usersService.findOne({
      where: {
        socialId: socialData.id,
        provider: authProvider,
      },
    });

    if (user) {
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      await this.usersService.update(user.id, user);
    } else if (userByEmail) {
      user = userByEmail;
    } else {
      const role = plainToClass(RoleEntity, {
        id: RoleEnum.user,
      });
      const status = plainToClass(Status, {
        id: StatusEnum.active,
      });

      user = await this.usersService.create({
        email: socialEmail,
        firstName: socialData.firstName,
        lastName: socialData.lastName,
        socialId: socialData.id,
        provider: authProvider,
        role,
        status,
      });

      user = await this.usersService.findById(user.id);
    }

    const jwtToken = await this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return {
      token: jwtToken,
      user,
    };
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const hash = createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersService.create({
      ...dto,
      email: dto.email,
      role: {
        id: RoleEnum.user,
      } as RoleEntity,
      status: {
        id: StatusEnum.inactive,
      } as Status,
      hash,
    });

    await this.mailService.userSignUp({
      to: user.email,
      data: {
        hash,
      },
    });
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersService.findOne({ where: { hash } });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user.hash = null;
    user.status = plainToClass(Status, {
      id: StatusEnum.active,
    });
    await user.save();
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      const hash = createHash('sha256')
        .update(randomStringGenerator())
        .digest('hex');
      await this.forgotService.create({
        hash,
        user,
      });

      await this.mailService.forgotPassword({
        to: email,
        data: {
          hash,
        },
      });
    }
  }

  async resetPassword(hash: string, password: string): Promise<void> {
    const forgot = await this.forgotService.findOne({
      where: {
        hash,
      },
    });

    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = forgot.user;
    user.password = password;
    await user.save();
    await this.forgotService.softDelete(forgot.id);
  }

  async me(user: UserEntity): Promise<UserEntity> {
    return this.usersService.findById(user.id);
  }

  async update(user: UserEntity, userDto: AuthUpdateDto): Promise<UserEntity> {
    if (userDto.password) {
      if (userDto.oldPassword) {
        const currentUser = await this.usersService.findById(user.id);

        const isValidOldPassword = await this.hashService.bcryptCompare(
          userDto.oldPassword,
          currentUser.password,
        );

        if (!isValidOldPassword) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                oldPassword: 'incorrectOldPassword',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'missingOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    await this.usersService.update(user.id, userDto);

    return this.usersService.findById(user.id);
  }

  async softDelete(user: UserEntity): Promise<void> {
    await this.usersService.softDelete(user.id);
  }
}
