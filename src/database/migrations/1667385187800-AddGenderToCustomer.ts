import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenderToCustomer1667385187800 implements MigrationInterface {
    name = 'AddGenderToCustomer1667385187800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."customers_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "gender" "public"."customers_gender_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."customers_gender_enum"`);
    }

}
