import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1691915104397 implements MigrationInterface {
    name = 'BaseMigration1691915104397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."training_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "training" ("id" uuid NOT NULL, "data" character varying NOT NULL, "start_date" character varying NOT NULL, "finish_date" character varying NOT NULL, "type" character varying NOT NULL, "status" "public"."training_status_enum" NOT NULL DEFAULT '1', "user_id" uuid, CONSTRAINT "REL_9b3f7b75eddeb04a71a80501eb" UNIQUE ("user_id"), CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_payments" ("id" uuid NOT NULL, "start_date" integer NOT NULL, "end_date" integer NOT NULL, "card_number" integer NOT NULL, "user_id" uuid, "manager_id" uuid, CONSTRAINT "UQ_03a3596e7c7de6b39ba7f420ee6" UNIQUE ("card_number"), CONSTRAINT "REL_b6211bf9b1393a35f7341655a4" UNIQUE ("user_id"), CONSTRAINT "REL_3b676ac89633cf173c314c8bcc" UNIQUE ("manager_id"), CONSTRAINT "PK_d4cd725874e6403f6a8f774cdad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_settings_theme_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "user_settings" ("id" uuid NOT NULL, "theme" "public"."user_settings_theme_enum" NOT NULL DEFAULT '0', "user_id" uuid, CONSTRAINT "REL_4ed056b9344e6f7d8d46ec4b30" UNIQUE ("user_id"), CONSTRAINT "PK_00f004f5922a0744d174530d639" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."nutrition_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "nutrition" ("id" uuid NOT NULL, "data" character varying NOT NULL, "date" character varying NOT NULL, "name" character varying NOT NULL, "status" "public"."nutrition_status_enum" NOT NULL DEFAULT '1', "user_id" uuid, CONSTRAINT "REL_4ebc4f8462f999d16b18456b76" UNIQUE ("user_id"), CONSTRAINT "PK_e8da4724c54762e994d879b11c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ward" ("id" uuid NOT NULL, "user_id" uuid, "coach_id" uuid, CONSTRAINT "REL_7d115731b5e6a720b9aba8f104" UNIQUE ("user_id"), CONSTRAINT "REL_7d90eea8dd42343d6805b6d085" UNIQUE ("coach_id"), CONSTRAINT "PK_e6725fa4a50e449c4352d2230e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL, "text" character varying NOT NULL, "users_type" character varying NOT NULL, "author_id" uuid, CONSTRAINT "REL_173d93468ebf142bb3424c2fd6" UNIQUE ("author_id"), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" "public"."user_type_enum" NOT NULL DEFAULT '5'`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "activation_status"`);
        await queryRunner.query(`CREATE TYPE "public"."user_activation_status_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "activation_status" "public"."user_activation_status_enum" NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_9b3f7b75eddeb04a71a80501ebd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_payments" ADD CONSTRAINT "FK_b6211bf9b1393a35f7341655a48" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_payments" ADD CONSTRAINT "FK_3b676ac89633cf173c314c8bcc1" FOREIGN KEY ("manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_settings" ADD CONSTRAINT "FK_4ed056b9344e6f7d8d46ec4b302" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nutrition" ADD CONSTRAINT "FK_4ebc4f8462f999d16b18456b76a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_7d115731b5e6a720b9aba8f104a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_7d90eea8dd42343d6805b6d0856" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_173d93468ebf142bb3424c2fd63" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_173d93468ebf142bb3424c2fd63"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_7d90eea8dd42343d6805b6d0856"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_7d115731b5e6a720b9aba8f104a"`);
        await queryRunner.query(`ALTER TABLE "nutrition" DROP CONSTRAINT "FK_4ebc4f8462f999d16b18456b76a"`);
        await queryRunner.query(`ALTER TABLE "user_settings" DROP CONSTRAINT "FK_4ed056b9344e6f7d8d46ec4b302"`);
        await queryRunner.query(`ALTER TABLE "user_payments" DROP CONSTRAINT "FK_3b676ac89633cf173c314c8bcc1"`);
        await queryRunner.query(`ALTER TABLE "user_payments" DROP CONSTRAINT "FK_b6211bf9b1393a35f7341655a48"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_9b3f7b75eddeb04a71a80501ebd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "activation_status"`);
        await queryRunner.query(`DROP TYPE "public"."user_activation_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "activation_status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "ward"`);
        await queryRunner.query(`DROP TABLE "nutrition"`);
        await queryRunner.query(`DROP TYPE "public"."nutrition_status_enum"`);
        await queryRunner.query(`DROP TABLE "user_settings"`);
        await queryRunner.query(`DROP TYPE "public"."user_settings_theme_enum"`);
        await queryRunner.query(`DROP TABLE "user_payments"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`DROP TYPE "public"."training_status_enum"`);
    }

}
