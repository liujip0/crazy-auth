import { z } from "zod";
import { PostsRow } from "../../dbtypes/Posts.ts";
import { publicProcedure } from "../../trpc.ts";

export const getPosts = publicProcedure
  .input(
    z.object({
      limit: z.number().int().min(1).default(20),
      offset: z.number().int().min(0).default(0),
      user: z.string().optional(),
    })
  )
  .query(async (opts) => {
    let posts: D1Result<PostsRow>;
    if (opts.input.user) {
      posts = await opts.ctx.env.DB.prepare(
        `SELECT
          id, user, title, body 
        FROM
          Posts
        WHERE user = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?;`
      )
        .bind(opts.input.user, opts.input.limit, opts.input.offset)
        .run<PostsRow>();
    } else {
      posts = await opts.ctx.env.DB.prepare(
        `SELECT
          id, user, title, body 
        FROM
          Posts
        ORDER BY id DESC
        LIMIT ? OFFSET ?;`
      )
        .bind(opts.input.limit, opts.input.offset)
        .run<PostsRow>();
    }

    if (posts.success) {
      return posts.results as PostsRow[];
    }
  });
