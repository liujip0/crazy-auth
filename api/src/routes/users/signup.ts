import bcrypt from "bcryptjs";
import z from "zod";
import { publicProcedure } from "../../trpc.ts";

export const signup = publicProcedure
  .input(
    z.object({
      username: z.string().min(1),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    const hashedPassword = await bcrypt.hash(opts.input.password, 10);

    return await opts.ctx.env.DB.prepare(
      "INSERT INTO Users (username, password_hash) VALUES (?, ?);"
    )
      .bind(opts.input.username, hashedPassword)
      .run();
  });
