import { MigrationInterface, QueryRunner } from "typeorm";

export class administrator1666023155977 implements MigrationInterface {
    name = 'administrator1666023155977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "administrator" ("id" SERIAL NOT NULL, "username" text NOT NULL, "passwordDigest" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9bd68c9cbb3712df77e60e27b77" UNIQUE ("username"), CONSTRAINT "PK_ee58e71b3b4008b20ddc7b3092b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "administrator"`);
    }

}
