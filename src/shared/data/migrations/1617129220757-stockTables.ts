import {MigrationInterface, QueryRunner} from "typeorm";

export class stockTables1617129220757 implements MigrationInterface {
    name = 'stockTables1617129220757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "OPTION_VALUES" ("id" SERIAL NOT NULL, "OPTION_VALUES" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "option_id" integer NOT NULL, CONSTRAINT "PK_30a41fc4f08e3e9a825b29cd14a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PRODUCT_VARIANTS" ("id" SERIAL NOT NULL, "sku" character varying NOT NULL, "cost-price" double precision NOT NULL, "sale-price" double precision NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "product_id" integer NOT NULL, "option_id" integer NOT NULL, "option_value_id" integer NOT NULL, CONSTRAINT "UQ_9a3ad1880ca8975ccddc43a8a63" UNIQUE ("sku"), CONSTRAINT "PK_dffed2e6fb2dcce1972ca984b4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "OPTIONS" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9d9bcb5d4b5b685720ad55a5dd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PRODUCT_OPTIONS" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "product_id" integer NOT NULL, "option_id" integer NOT NULL, CONSTRAINT "PK_b0578a86b95f22203c1d0978cf6" PRIMARY KEY ("product_id", "option_id"))`);
        await queryRunner.query(`CREATE TABLE "SUPPLIER" ("id" SERIAL NOT NULL, "cnpj" character varying(14) NOT NULL, "trade_name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_56352314d9f50a30da17725ee71" UNIQUE ("cnpj"), CONSTRAINT "PK_d2c9186c84d9da1f20e94d4616a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PRODUCTS" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "category_id" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "supplier_id" integer NOT NULL, CONSTRAINT "PK_2fe88715843405b725ad16c32fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PRODUCT_CATEGORIES" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_ad11f74b1cfc6f89f929008dc68" PRIMARY KEY ("category_id", "product_id"))`);
        await queryRunner.query(`CREATE TABLE "CATEGORIES" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fdcef262c7ee3ae985f62b3695f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "OPTION_VALUES" ADD CONSTRAINT "FK_5442e20bb0c03fdcbf09866325a" FOREIGN KEY ("option_id") REFERENCES "OPTIONS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_VARIANTS" ADD CONSTRAINT "FK_a622d4b27873ecb321c37aa3fea" FOREIGN KEY ("product_id") REFERENCES "PRODUCTS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_VARIANTS" ADD CONSTRAINT "FK_25114c9b34a6be78d3dc5a5cc17" FOREIGN KEY ("option_id") REFERENCES "OPTIONS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_VARIANTS" ADD CONSTRAINT "FK_4bf02ec238344fd7a45ff59b24e" FOREIGN KEY ("option_value_id") REFERENCES "OPTION_VALUES"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_OPTIONS" ADD CONSTRAINT "FK_ed517744ff05cb135cba2b46cde" FOREIGN KEY ("product_id") REFERENCES "PRODUCTS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_OPTIONS" ADD CONSTRAINT "FK_98ad55529f73a7e97584c8ca49b" FOREIGN KEY ("option_id") REFERENCES "OPTIONS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PRODUCTS" ADD CONSTRAINT "FK_f88cce6fb6c729133f30d11fa24" FOREIGN KEY ("supplier_id") REFERENCES "SUPPLIER"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_CATEGORIES" ADD CONSTRAINT "FK_222a9f7f96a6ad9ff74fc6a9eca" FOREIGN KEY ("category_id") REFERENCES "CATEGORIES"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_CATEGORIES" ADD CONSTRAINT "FK_3112257962d11257d00ad584ee2" FOREIGN KEY ("product_id") REFERENCES "PRODUCTS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PRODUCT_CATEGORIES" DROP CONSTRAINT "FK_3112257962d11257d00ad584ee2"`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_CATEGORIES" DROP CONSTRAINT "FK_222a9f7f96a6ad9ff74fc6a9eca"`);
        await queryRunner.query(`ALTER TABLE "PRODUCTS" DROP CONSTRAINT "FK_f88cce6fb6c729133f30d11fa24"`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_OPTIONS" DROP CONSTRAINT "FK_98ad55529f73a7e97584c8ca49b"`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_OPTIONS" DROP CONSTRAINT "FK_ed517744ff05cb135cba2b46cde"`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_VARIANTS" DROP CONSTRAINT "FK_4bf02ec238344fd7a45ff59b24e"`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_VARIANTS" DROP CONSTRAINT "FK_25114c9b34a6be78d3dc5a5cc17"`);
        await queryRunner.query(`ALTER TABLE "PRODUCT_VARIANTS" DROP CONSTRAINT "FK_a622d4b27873ecb321c37aa3fea"`);
        await queryRunner.query(`ALTER TABLE "OPTION_VALUES" DROP CONSTRAINT "FK_5442e20bb0c03fdcbf09866325a"`);
        await queryRunner.query(`DROP TABLE "CATEGORIES"`);
        await queryRunner.query(`DROP TABLE "PRODUCT_CATEGORIES"`);
        await queryRunner.query(`DROP TABLE "PRODUCTS"`);
        await queryRunner.query(`DROP TABLE "SUPPLIER"`);
        await queryRunner.query(`DROP TABLE "PRODUCT_OPTIONS"`);
        await queryRunner.query(`DROP TABLE "OPTIONS"`);
        await queryRunner.query(`DROP TABLE "PRODUCT_VARIANTS"`);
        await queryRunner.query(`DROP TABLE "OPTION_VALUES"`);
    }

}
