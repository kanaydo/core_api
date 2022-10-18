import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSectionToRole1666102215217 implements MigrationInterface {
    name = 'AddSectionToRole1666102215217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "sections" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "sections"`);
    }

}
