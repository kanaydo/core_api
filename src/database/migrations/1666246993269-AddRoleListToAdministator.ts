import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleListToAdministator1666246993269 implements MigrationInterface {
    name = 'AddRoleListToAdministator1666246993269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" ADD "role_list" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" DROP COLUMN "role_list"`);
    }

}
