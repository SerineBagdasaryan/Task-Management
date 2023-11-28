import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateAdminUser1699712141062 implements MigrationInterface {
  name = 'CreateAdminUser1699712141062';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashPassword = await bcrypt.hash('123456789', 10);
    await queryRunner.query(
      `
                    INSERT INTO "user" (email, password, first_name, last_name, role)
                    VALUES ($1, $2, $3, $4, $5);
            `,
      ['admin@gmail.com', hashPassword, 'Admin', 'Yan', 'admin'],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE
            FROM "user"
            WHERE role = 'admin';
        `);
  }
}
