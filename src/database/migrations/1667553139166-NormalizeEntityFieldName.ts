import { MigrationInterface, QueryRunner } from "typeorm";

export class NormalizeEntityFieldName1667553139166 implements MigrationInterface {
    name = 'NormalizeEntityFieldName1667553139166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "firstName" text`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "lastName" text`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "last_name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "first_name" text NOT NULL`);
    }

}
