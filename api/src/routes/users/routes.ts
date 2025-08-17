import { router } from "../../trpc.ts";
import { checkusername } from "./checkusername.ts";
import { signup } from "./signup.ts";

export const usersRouter = router({
  signup: signup,
  checkusername: checkusername,
});
