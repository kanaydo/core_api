import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToAdministrator1666527264607 implements MigrationInterface {
    name = 'AddStatusToAdministrator1666527264607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."administrators_role_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD "role" "public"."administrators_role_enum" NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."administrators_role_enum"`);
    }

}
