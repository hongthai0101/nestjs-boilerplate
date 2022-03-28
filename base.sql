/*
 Navicat Premium Data Transfer

 Source Server         : Postgre Local
 Source Server Type    : PostgreSQL
 Source Server Version : 140002
 Source Host           : 127.0.0.1:5432
 Source Catalog        : tomato-work
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140002
 File Encoding         : 65001

 Date: 27/03/2022 11:58:13
*/


-- ----------------------------
-- Sequence structure for forgot_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."forgot_id_seq";
CREATE SEQUENCE "public"."forgot_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."forgot_id_seq" OWNER TO "default";

-- ----------------------------
-- Sequence structure for migrations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."migrations_id_seq";
CREATE SEQUENCE "public"."migrations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."migrations_id_seq" OWNER TO "default";

-- ----------------------------
-- Sequence structure for user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_id_seq";
CREATE SEQUENCE "public"."user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."user_id_seq" OWNER TO "default";

-- ----------------------------
-- Table structure for capital-flow-types
-- ----------------------------
DROP TABLE IF EXISTS "public"."capital-flow-types";
CREATE TABLE "public"."capital-flow-types" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "uid" int4 NOT NULL,
  "sortIndex" int2 DEFAULT 0,
  "type" int2 DEFAULT 0,
  "name" varchar(20) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6),
  "updatedAt" timestamptz(6)
)
;
ALTER TABLE "public"."capital-flow-types" OWNER TO "default";

-- ----------------------------
-- Records of capital-flow-types
-- ----------------------------
BEGIN;
INSERT INTO "public"."capital-flow-types" VALUES ('57b11abb-233c-4c44-906c-005796ed66b7', 2, 0, 0, 'name', NULL, NULL);
INSERT INTO "public"."capital-flow-types" VALUES ('0c2ac0b8-5835-4c24-afe6-92bb88e4059b', 2, 0, 0, 'name', NULL, NULL);
INSERT INTO "public"."capital-flow-types" VALUES ('a86ccfdf-8e5b-4570-ab81-58503f56c528', 2, 0, 0, 'name', NULL, NULL);
INSERT INTO "public"."capital-flow-types" VALUES ('ba545975-0b2e-4f17-8d00-289265c37eee', 2, 0, 0, 'name', NULL, NULL);
INSERT INTO "public"."capital-flow-types" VALUES ('ac7f544e-9a9b-4080-b242-ee49a66d4471', 2, 0, 0, 'name', NULL, NULL);
INSERT INTO "public"."capital-flow-types" VALUES ('e8270581-aaaa-4002-af01-3e0897d865db', 2, 0, 0, 'name', '2022-03-26 16:42:33.443+00', '2022-03-26 16:42:33.443+00');
COMMIT;

-- ----------------------------
-- Table structure for capital-flows
-- ----------------------------
DROP TABLE IF EXISTS "public"."capital-flows";
CREATE TABLE "public"."capital-flows" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "uid" int4 NOT NULL,
  "price" numeric(9,2) DEFAULT 0,
  "typeId" uuid NOT NULL,
  "remark" varchar(20) COLLATE "pg_catalog"."default",
  "createdAt" timestamp(6),
  "updatedAt" timestamp(6)
)
;
ALTER TABLE "public"."capital-flows" OWNER TO "default";

-- ----------------------------
-- Records of capital-flows
-- ----------------------------
BEGIN;
INSERT INTO "public"."capital-flows" VALUES ('e393df34-b67a-4ce4-bcf0-d22ef4d50f5b', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', NULL, NULL);
INSERT INTO "public"."capital-flows" VALUES ('847c57cf-a933-47c1-8d08-86c564529a29', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', NULL, NULL);
INSERT INTO "public"."capital-flows" VALUES ('4926a9ca-a4a1-4e2f-a92c-e312f87772de', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', NULL, NULL);
INSERT INTO "public"."capital-flows" VALUES ('693bfddd-febe-4e2a-bafa-62cafdbc547f', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', '2022-03-25 14:05:35.395', '2022-03-25 14:05:35.395');
INSERT INTO "public"."capital-flows" VALUES ('68120175-545e-469c-af71-963c2ca19bd0', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', '2022-03-25 16:33:54.501', '2022-03-25 16:33:54.501');
INSERT INTO "public"."capital-flows" VALUES ('8996584c-8972-45b0-b605-14f8379902b7', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', '2022-03-25 16:38:47.989', '2022-03-25 16:38:47.989');
INSERT INTO "public"."capital-flows" VALUES ('b5bdce54-2c71-46c1-9344-7493a209ea28', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', '2022-03-25 20:49:42.998', '2022-03-25 20:49:42.998');
INSERT INTO "public"."capital-flows" VALUES ('642ee71a-bb77-406a-a421-65da1a8c17c2', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', '2022-03-26 15:47:42.773', '2022-03-26 15:47:42.773');
INSERT INTO "public"."capital-flows" VALUES ('960512cd-670c-4842-b187-96c1d70169ec', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', '2022-03-26 16:06:58.611', '2022-03-26 16:06:58.611');
INSERT INTO "public"."capital-flows" VALUES ('7248c7ff-6547-4157-804d-2e9638d4a25a', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', '2022-03-26 16:08:43.534', '2022-03-26 16:08:43.534');
INSERT INTO "public"."capital-flows" VALUES ('e0f12782-4eff-4a1e-a28b-464bbd2e6631', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'le hong thai', '2022-03-26 16:36:08', '2022-03-26 09:32:08.297895');
INSERT INTO "public"."capital-flows" VALUES ('74b4b913-9ecb-45cc-bbd4-6b37651313f4', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', '2022-03-26 23:39:52.492', '2022-03-26 23:39:52.492');
INSERT INTO "public"."capital-flows" VALUES ('5763321a-c18a-4f20-9e0f-c9b6775a0f70', 2, 20000.00, 'a86ccfdf-8e5b-4570-ab81-58503f56c528', 'remark', '2022-03-26 23:41:03.246', '2022-03-26 23:41:03.246');
COMMIT;

-- ----------------------------
-- Table structure for companies
-- ----------------------------
DROP TABLE IF EXISTS "public"."companies";
CREATE TABLE "public"."companies" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "uid" int4 NOT NULL,
  "amount" numeric(9,2) NOT NULL DEFAULT 0,
  "remark" varchar(20) COLLATE "pg_catalog"."default",
  "createdAt" timestamp(6),
  "updatedAt" timestamp(6),
  "startDate" timestamp(6),
  "endDate" timestamp(6),
  "expectLeaveDate" timestamp(6),
  "name" varchar(100) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."companies" OWNER TO "default";

-- ----------------------------
-- Records of companies
-- ----------------------------
BEGIN;
INSERT INTO "public"."companies" VALUES ('dc0f7504-c171-4104-999b-03bf5c86f24f', 2, 1000000.00, 'remark ThaiLe', '2022-03-27 10:47:46.66', '2022-03-27 10:47:46.66', '2022-03-27 10:44:00.115', '2022-03-27 10:44:00.115', '2022-03-27 10:44:00.115', 'ThaiLe');
INSERT INTO "public"."companies" VALUES ('dfb45200-e503-425a-be98-a3118d8a4fa9', 2, 1000000.00, 'remark ThaiLe', '2022-03-27 10:47:55.271', '2022-03-27 10:47:55.271', '2022-03-27 10:44:00.115', '2022-03-27 10:44:00.115', '2022-03-27 10:44:00.115', 'ThaiLe');
INSERT INTO "public"."companies" VALUES ('6270f819-f106-4ad6-a16b-d935fee54412', 2, 1000000.00, 'remark ThaiLe', '2022-03-27 10:47:56.012', '2022-03-27 10:47:56.012', '2022-03-27 10:44:00.115', '2022-03-27 10:44:00.115', '2022-03-27 10:44:00.115', 'ThaiLe');
COMMIT;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS "public"."file";
CREATE TABLE "public"."file" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "path" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamptz(6),
  "updatedAt" timestamptz(6)
)
;
ALTER TABLE "public"."file" OWNER TO "default";

-- ----------------------------
-- Records of file
-- ----------------------------
BEGIN;
INSERT INTO "public"."file" VALUES ('6df72924-fa32-4371-973b-e44d6b7ff56e', '1', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for forgot
-- ----------------------------
DROP TABLE IF EXISTS "public"."forgot";
CREATE TABLE "public"."forgot" (
  "id" int4 NOT NULL DEFAULT nextval('forgot_id_seq'::regclass),
  "hash" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamp(6),
  "userId" int4
)
;
ALTER TABLE "public"."forgot" OWNER TO "default";

-- ----------------------------
-- Records of forgot
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."migrations";
CREATE TABLE "public"."migrations" (
  "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
  "timestamp" int8 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."migrations" OWNER TO "default";

-- ----------------------------
-- Records of migrations
-- ----------------------------
BEGIN;
INSERT INTO "public"."migrations" VALUES (1, 1604164774154, 'CreateUser1604164774154');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
  "id" int4 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamptz(6),
  "updatedAt" timestamptz(6)
)
;
ALTER TABLE "public"."role" OWNER TO "default";

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO "public"."role" VALUES (2, 'User', NULL, NULL);
INSERT INTO "public"."role" VALUES (1, 'Admin', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS "public"."status";
CREATE TABLE "public"."status" (
  "id" int4 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamptz(6),
  "updatedAt" timestamptz(6)
)
;
ALTER TABLE "public"."status" OWNER TO "default";

-- ----------------------------
-- Records of status
-- ----------------------------
BEGIN;
INSERT INTO "public"."status" VALUES (1, 'Active', NULL, NULL);
INSERT INTO "public"."status" VALUES (2, 'Inactive', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for typeorm_metadata
-- ----------------------------
DROP TABLE IF EXISTS "public"."typeorm_metadata";
CREATE TABLE "public"."typeorm_metadata" (
  "type" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "database" varchar COLLATE "pg_catalog"."default",
  "schema" varchar COLLATE "pg_catalog"."default",
  "table" varchar COLLATE "pg_catalog"."default",
  "name" varchar COLLATE "pg_catalog"."default",
  "value" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."typeorm_metadata" OWNER TO "default";

-- ----------------------------
-- Records of typeorm_metadata
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
  "email" varchar COLLATE "pg_catalog"."default",
  "password" varchar COLLATE "pg_catalog"."default",
  "provider" varchar COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'email'::character varying,
  "socialId" varchar COLLATE "pg_catalog"."default",
  "firstName" varchar COLLATE "pg_catalog"."default",
  "lastName" varchar COLLATE "pg_catalog"."default",
  "hash" varchar COLLATE "pg_catalog"."default",
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamp(6),
  "photoId" uuid,
  "roleId" int4,
  "statusId" int4
)
;
ALTER TABLE "public"."user" OWNER TO "default";

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO "public"."user" VALUES (1, 'admin@example.com', '$2a$10$JEg0A7/jvDdi1Gbxg4/N/em1jyOkct.2Hk9rqMccfrjEZ.1s.26Le', 'email', NULL, 'Super', 'Admin', NULL, '2022-03-25 03:53:05.492119', '2022-03-25 03:53:05.492119', NULL, NULL, 1, 1);
INSERT INTO "public"."user" VALUES (2, 'john.doe@example.com', '$2a$10$RrWfaCeqFVrPZlRe4YZM1uqW6nlbxuthgL66IjkFCCLSnoVEIhhta', 'email', NULL, 'John', 'Doe', NULL, '2022-03-25 03:53:05.60168', '2022-03-25 03:53:05.60168', NULL, NULL, 2, 1);
COMMIT;

-- ----------------------------
-- Function structure for uuid_generate_v1
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_generate_v1"() OWNER TO "default";

-- ----------------------------
-- Function structure for uuid_generate_v1mc
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1mc"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1mc"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1mc'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_generate_v1mc"() OWNER TO "default";

-- ----------------------------
-- Function structure for uuid_generate_v3
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v3"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v3"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v3'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_generate_v3"("namespace" uuid, "name" text) OWNER TO "default";

-- ----------------------------
-- Function structure for uuid_generate_v4
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v4"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v4"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v4'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_generate_v4"() OWNER TO "default";

-- ----------------------------
-- Function structure for uuid_generate_v5
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v5"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v5"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v5'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_generate_v5"("namespace" uuid, "name" text) OWNER TO "default";

-- ----------------------------
-- Function structure for uuid_nil
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_nil"();
CREATE OR REPLACE FUNCTION "public"."uuid_nil"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_nil'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_nil"() OWNER TO "default";

-- ----------------------------
-- Function structure for uuid_ns_dns
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_dns"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_dns"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_dns'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_ns_dns"() OWNER TO "default";

-- ----------------------------
-- Function structure for uuid_ns_oid
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_oid"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_oid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_oid'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_ns_oid"() OWNER TO "default";

-- ----------------------------
-- Function structure for uuid_ns_url
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_url"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_url"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_url'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_ns_url"() OWNER TO "default";

-- ----------------------------
-- Function structure for uuid_ns_x500
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_x500"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_x500"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_x500'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid_ns_x500"() OWNER TO "default";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."forgot_id_seq"
OWNED BY "public"."forgot"."id";
SELECT setval('"public"."forgot_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."migrations_id_seq"
OWNED BY "public"."migrations"."id";
SELECT setval('"public"."migrations_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_id_seq"
OWNED BY "public"."user"."id";
SELECT setval('"public"."user_id_seq"', 3, true);

-- ----------------------------
-- Indexes structure for table capital-flow-types
-- ----------------------------
CREATE INDEX "capital_flow_types_uid" ON "public"."capital-flow-types" USING btree (
  "uid" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table capital-flow-types
-- ----------------------------
ALTER TABLE "public"."capital-flow-types" ADD CONSTRAINT "file_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table capital-flows
-- ----------------------------
CREATE INDEX "capital_flows_type_id" ON "public"."capital-flows" USING btree (
  "typeId" "pg_catalog"."uuid_ops" ASC NULLS LAST
);
CREATE INDEX "capital_flows_uid" ON "public"."capital-flows" USING btree (
  "uid" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table capital-flows
-- ----------------------------
ALTER TABLE "public"."capital-flows" ADD CONSTRAINT "file_copy1_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table companies
-- ----------------------------
CREATE INDEX "user_uid" ON "public"."companies" USING btree (
  "uid" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table companies
-- ----------------------------
ALTER TABLE "public"."companies" ADD CONSTRAINT "capital-flows_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table file
-- ----------------------------
ALTER TABLE "public"."file" ADD CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table forgot
-- ----------------------------
CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "public"."forgot" USING btree (
  "hash" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table forgot
-- ----------------------------
ALTER TABLE "public"."forgot" ADD CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table migrations
-- ----------------------------
ALTER TABLE "public"."migrations" ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table status
-- ----------------------------
ALTER TABLE "public"."status" ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table user
-- ----------------------------
CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "public"."user" USING btree (
  "firstName" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "public"."user" USING btree (
  "socialId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "public"."user" USING btree (
  "hash" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "public"."user" USING btree (
  "lastName" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table capital-flow-types
-- ----------------------------
ALTER TABLE "public"."capital-flow-types" ADD CONSTRAINT "FK_capital_flow_types_uid" FOREIGN KEY ("uid") REFERENCES "public"."user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table capital-flows
-- ----------------------------
ALTER TABLE "public"."capital-flows" ADD CONSTRAINT "capital_flows_type_id" FOREIGN KEY ("typeId") REFERENCES "public"."capital-flow-types" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."capital-flows" ADD CONSTRAINT "capital_flows_uid" FOREIGN KEY ("uid") REFERENCES "public"."user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table companies
-- ----------------------------
ALTER TABLE "public"."companies" ADD CONSTRAINT "user_uid" FOREIGN KEY ("uid") REFERENCES "public"."user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table forgot
-- ----------------------------
ALTER TABLE "public"."forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "public"."file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "public"."role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "public"."status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
