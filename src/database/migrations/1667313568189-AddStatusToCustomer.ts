import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToCustomer1667313568189 implements MigrationInterface {
    name = 'AddStatusToCustomer1667313568189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."customers_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "status" "public"."customers_status_enum" NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."customers_status_enum"`);
    }

}
