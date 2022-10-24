import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDesctiptionToRole1666611253010 implements MigrationInterface {
    name = 'AddDesctiptionToRole1666611253010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "description"`);
    }

}
