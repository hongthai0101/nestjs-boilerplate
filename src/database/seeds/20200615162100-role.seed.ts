import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { RoleEntity } from 'src/components/roles/entities/role.entity';
import { RoleEnum } from 'src/components/roles/roles.enum';

export default class CreateRole implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countUser = await connection
      .createQueryBuilder()
      .select()
      .from(RoleEntity, 'Role')
      .where('"Role"."id" = :id', { id: RoleEnum.user })
      .getCount();

    if (countUser === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(RoleEntity)
        .values([{ id: RoleEnum.user, name: 'User' }])
        .execute();
    }

    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(RoleEntity, 'Role')
      .where('"Role"."id" = :id', { id: RoleEnum.admin })
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(RoleEntity)
        .values([{ id: RoleEnum.admin, name: 'Admin' }])
        .execute();
    }
  }
}
