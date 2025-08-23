import { router } from "../../trpc.ts";
import { getPosts } from "./getPosts.ts";
import { publishPost } from "./publishPost.ts";

export const postsRouter = router({
  getPosts,
  publishPost,
});
