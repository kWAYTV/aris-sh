DROP INDEX "account_user_id_idx";--> statement-breakpoint
DROP INDEX "session_user_id_idx";--> statement-breakpoint
DROP INDEX "session_token_idx";--> statement-breakpoint
DROP INDEX "two_factor_secret_idx";--> statement-breakpoint
DROP INDEX "user_email_idx";--> statement-breakpoint
DROP INDEX "verification_identifier_idx";--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "impersonated_by" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "banned" boolean;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "ban_reason" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "ban_expires" timestamp;