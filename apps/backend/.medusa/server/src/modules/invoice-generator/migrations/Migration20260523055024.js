"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260523055024 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260523055024 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "invoice" ("id" text not null, "display_id" serial, "order_id" text not null, "status" text check ("status" in ('latest', 'stale')) not null default 'latest', "pdfContent" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "invoice_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_invoice_deleted_at" ON "invoice" ("deleted_at") WHERE deleted_at IS NULL;`);
        this.addSql(`create table if not exists "invoice_config" ("id" text not null, "company_name" text not null, "company_address" text not null, "company_phone" text not null, "company_email" text not null, "company_logo" text null, "notes" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "invoice_config_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_invoice_config_deleted_at" ON "invoice_config" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "invoice" cascade;`);
        this.addSql(`drop table if exists "invoice_config" cascade;`);
    }
}
exports.Migration20260523055024 = Migration20260523055024;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA1MjMwNTUwMjQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9pbnZvaWNlLWdlbmVyYXRvci9taWdyYXRpb25zL01pZ3JhdGlvbjIwMjYwNTIzMDU1MDI0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFxRTtBQUVyRSxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBRTNDLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3WUFBd1ksQ0FBQyxDQUFDO1FBQ3RaLElBQUksQ0FBQyxNQUFNLENBQUMsMkdBQTJHLENBQUMsQ0FBQztRQUV6SCxJQUFJLENBQUMsTUFBTSxDQUFDLG1hQUFtYSxDQUFDLENBQUM7UUFDamIsSUFBSSxDQUFDLE1BQU0sQ0FBQyx5SEFBeUgsQ0FBQyxDQUFDO0lBQ3pJLENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FFRjtBQWhCRCwwREFnQkMifQ==