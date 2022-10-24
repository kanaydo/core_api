import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1666622254842 implements MigrationInterface {
    name = 'InitialMigration1666622254842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "sections" text NOT NULL, "status" "public"."roles_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "administrators" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "password_digest" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "role_list" text, "status" "public"."administrators_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "UQ_f191e970d8ff9f2cd332025714b" UNIQUE ("username"), CONSTRAINT "PK_aaa48522d99c3b6b33fdea7dc2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "administrators"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
