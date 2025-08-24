import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import { UsersRow } from "../../dbtypes/Users.ts";
import { publicProcedure } from "../../trpc.ts";

export const login = publicProcedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    const user = await opts.ctx.env.DB.prepare(
      "SELECT username, password_hash FROM Users WHERE username = ?;"
    )
      .bind(opts.input.username)
      .run<UsersRow>();

    if (!user.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user.",
      });
    }

    if (user.results.length < 1) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });
    }

    const passwordHash = user.results[0].password_hash;
    const validPassword = await bcrypt.compare(
      opts.input.password,
      passwordHash
    );
    if (!validPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });
    }

    console.log(opts.ctx.env.JWT_SECRET);
    const jwtToken = jwt.sign(
      {
        username: user.results[0].username,
      },
      opts.ctx.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return jwtToken;
  });
