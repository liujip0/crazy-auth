import { z } from "zod";
import { PostsRow } from "../../dbtypes/Posts.ts";
import { publicProcedure } from "../../trpc.ts";

export const getPosts = publicProcedure
  .input(
    z.object({
      limit: z.number().int().min(1).default(20),
      offset: z.number().int().min(0).default(0),
    })
  )
  .query(async (opts) => {
    const queryRes = await opts.ctx.env.DB.prepare(
      `SELECT
        id, user, title, body 
      FROM
        Posts
      ORDER BY id ASC
      LIMIT ? OFFSET ?;`
    )
      .bind(opts.input.limit, opts.input.offset)
      .run<PostsRow>();

    if (queryRes.success) {
      return queryRes.results;
    }
  });
