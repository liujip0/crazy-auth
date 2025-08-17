import z from "zod";
import { publicProcedure } from "../../trpc.ts";

export const signup = publicProcedure
  .input(
    z.object({
      username: z.string().min(1),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {});
