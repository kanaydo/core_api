import { MigrationInterface, QueryRunner } from "typeorm";

export class AdditionalFieldToCustomer1667384941420 implements MigrationInterface {
    name = 'AdditionalFieldToCustomer1667384941420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "phone" text`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_88acd889fbe17d0e16cc4bc9174" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "address" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_88acd889fbe17d0e16cc4bc9174"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "phone"`);
    }

}
