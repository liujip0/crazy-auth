import { TRPCError } from "@trpc/server";
import z from "zod";
import { publicProcedure } from "../../trpc.ts";

export type UsernameStatus = "ok" | "taken" | "invalid";

export const checkusername = publicProcedure
  .input(z.string())
  .mutation(async (opts) => {
    const existingEntries = await opts.ctx.env.DB.prepare(
      "SELECT COUNT(*) as count FROM Users WHERE username = ?;"
    )
      .bind(opts.input)
      .run();

    if (existingEntries.success) {
      switch (existingEntries.results[0].count) {
        case 0:
          return "ok" as UsernameStatus;
        default:
          return "taken" as UsernameStatus;
      }
    } else {
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database query failed",
      });
    }
  });
