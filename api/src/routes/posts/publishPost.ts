import { TRPCError } from "@trpc/server";
import z from "zod";
import { authorizedProcedure } from "../../trpc.ts";

export const publishPost = authorizedProcedure
  .input(
    z.object({
      title: z.string(),
      content: z.string(),
    })
  )
  .mutation(async (opts) => {
    const result = await opts.ctx.env.DB.prepare(
      "INSERT INTO Posts (user, title, body) VALUES (?, ?, ?);"
    )
      .bind(opts.ctx.user.username, opts.input.title, opts.input.content)
      .run();

    if (!result.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create post.",
      });
    }
  });
