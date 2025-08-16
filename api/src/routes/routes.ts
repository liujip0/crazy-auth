import { router } from "../trpc.ts";
import { postsRouter } from "./posts/routes.ts";
import { usersRouter } from "./users/routes.ts";

export const appRouter = router({
  posts: postsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
