import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserEntity } from 'src/components/users/entities/user.entity';
import { RoleEnum } from 'src/components/roles/roles.enum';
import { StatusEnum } from 'src/components/statuses/statuses.enum';
import { plainToClass } from 'class-transformer';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(UserEntity, 'User')
      .where('"User"."roleId" = :roleId', { roleId: RoleEnum.admin })
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values([
          plainToClass(UserEntity, {
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@example.com',
            password: 'secret',
            role: {
              id: RoleEnum.admin,
              name: 'Admin',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
        ])
        .execute();
    }
  }
}
