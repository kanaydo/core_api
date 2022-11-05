import { MigrationInterface, QueryRunner } from "typeorm";

export class AssociateAdministratorToCustomer1667553885673 implements MigrationInterface {
    name = 'AssociateAdministratorToCustomer1667553885673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "administratorId" uuid`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_13cfc43a3e1430e4093cab64c43" UNIQUE ("administratorId")`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_13cfc43a3e1430e4093cab64c43" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_13cfc43a3e1430e4093cab64c43"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_13cfc43a3e1430e4093cab64c43"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "administratorId"`);
    }

}
