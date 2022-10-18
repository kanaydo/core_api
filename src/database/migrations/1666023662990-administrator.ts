import { MigrationInterface, QueryRunner } from "typeorm";

export class administrator1666023662990 implements MigrationInterface {
    name = 'administrator1666023662990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "administrators" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password_digest" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f191e970d8ff9f2cd332025714b" UNIQUE ("username"), CONSTRAINT "PK_aaa48522d99c3b6b33fdea7dc2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "administrators"`);
    }

}
