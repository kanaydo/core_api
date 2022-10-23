import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRoleToStatusOnAdministrator1666527379047 implements MigrationInterface {
    name = 'ChangeRoleToStatusOnAdministrator1666527379047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" RENAME COLUMN "role" TO "status"`);
        await queryRunner.query(`ALTER TYPE "public"."administrators_role_enum" RENAME TO "administrators_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."administrators_status_enum" RENAME TO "administrators_role_enum"`);
        await queryRunner.query(`ALTER TABLE "administrators" RENAME COLUMN "status" TO "role"`);
    }

}
