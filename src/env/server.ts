import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

/** Typed server environment. Import only from server code. */
export const SERVER_ENV = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
});
