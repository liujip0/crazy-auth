import { router } from "../../trpc.ts";
import { getPosts } from "./getPosts.ts";

export const postsRouter = router({
  getPosts: getPosts,
});
