import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import z from "zod";
import { publicProcedure } from "../../trpc.ts";

export const signup = publicProcedure
  .input(
    z.object({
      username: z.string().min(3),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    if (/"|'|\/|\\|\||<|>/.test(opts.input.username)) {
      return new TRPCError({
        code: "BAD_REQUEST",
        message:
          "Username cannot contain quotes, slashes, pipes, or angle brackets.",
      });
    }

    const hashedPassword = await bcrypt.hash(opts.input.password, 10);

    return await opts.ctx.env.DB.prepare(
      "INSERT INTO Users (username, password_hash) VALUES (?, ?);"
    )
      .bind(opts.input.username, hashedPassword)
      .run();
  });
