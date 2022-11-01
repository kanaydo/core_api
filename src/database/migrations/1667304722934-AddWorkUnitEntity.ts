import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkUnitEntity1667304722934 implements MigrationInterface {
    name = 'AddWorkUnitEntity1667304722934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."work_units_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "work_units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, "status" "public"."work_units_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_90fa3d1ad85ef87004d67caa78c" UNIQUE ("name"), CONSTRAINT "PK_6cdda4759f52712f6f8fb17607d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "work_units"`);
        await queryRunner.query(`DROP TYPE "public"."work_units_status_enum"`);
    }

}
