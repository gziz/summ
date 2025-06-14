CREATE SCHEMA "app_frontend";
--> statement-breakpoint
CREATE TYPE "app_frontend"."membership" AS ENUM('free', 'pro');--> statement-breakpoint
CREATE TABLE "app_frontend"."profiles" (
	"user_id" text PRIMARY KEY NOT NULL,
	"membership" "app_frontend"."membership" DEFAULT 'free' NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
