import {MigrationInterface, QueryRunner} from "typeorm";

export class authTables1617211107762 implements MigrationInterface {
    name = 'authTables1617211107762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "USERS" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b16c39a00c89083529c6166fa5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_055984372b62f71f274f3fe361" ON "USERS" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a1689164dbbcca860ce6d17b2e" ON "USERS" ("email") `);
        await queryRunner.query(`CREATE TABLE "ROLES" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_12e12839de05b41ee6236517924" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CLAIMS" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a4a3bb90940c3d3b3204affa1fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "USER_ROLES" ("role_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_9aacf0dccad3f9f73f8704c2344" PRIMARY KEY ("role_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd7408414d663ee6df3726fad5" ON "USER_ROLES" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4de4061070c4b3f6962efa6eb5" ON "USER_ROLES" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "ROLE_CLAIMS" ("role_id" integer NOT NULL, "claim_id" integer NOT NULL, CONSTRAINT "PK_b4095ba35b68d647e4e1bfbc368" PRIMARY KEY ("role_id", "claim_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d734daa675816973086989ddf2" ON "ROLE_CLAIMS" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1396aef90b2f79bec2028e04c5" ON "ROLE_CLAIMS" ("claim_id") `);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" ADD CONSTRAINT "FK_dd7408414d663ee6df3726fad55" FOREIGN KEY ("role_id") REFERENCES "ROLES"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" ADD CONSTRAINT "FK_4de4061070c4b3f6962efa6eb5a" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ROLE_CLAIMS" ADD CONSTRAINT "FK_d734daa675816973086989ddf20" FOREIGN KEY ("role_id") REFERENCES "ROLES"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ROLE_CLAIMS" ADD CONSTRAINT "FK_1396aef90b2f79bec2028e04c58" FOREIGN KEY ("claim_id") REFERENCES "CLAIMS"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ROLE_CLAIMS" DROP CONSTRAINT "FK_1396aef90b2f79bec2028e04c58"`);
        await queryRunner.query(`ALTER TABLE "ROLE_CLAIMS" DROP CONSTRAINT "FK_d734daa675816973086989ddf20"`);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" DROP CONSTRAINT "FK_4de4061070c4b3f6962efa6eb5a"`);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" DROP CONSTRAINT "FK_dd7408414d663ee6df3726fad55"`);
        await queryRunner.query(`DROP INDEX "IDX_1396aef90b2f79bec2028e04c5"`);
        await queryRunner.query(`DROP INDEX "IDX_d734daa675816973086989ddf2"`);
        await queryRunner.query(`DROP TABLE "ROLE_CLAIMS"`);
        await queryRunner.query(`DROP INDEX "IDX_4de4061070c4b3f6962efa6eb5"`);
        await queryRunner.query(`DROP INDEX "IDX_dd7408414d663ee6df3726fad5"`);
        await queryRunner.query(`DROP TABLE "USER_ROLES"`);
        await queryRunner.query(`DROP TABLE "CLAIMS"`);
        await queryRunner.query(`DROP TABLE "ROLES"`);
        await queryRunner.query(`DROP INDEX "IDX_a1689164dbbcca860ce6d17b2e"`);
        await queryRunner.query(`DROP INDEX "IDX_055984372b62f71f274f3fe361"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
    }

}
