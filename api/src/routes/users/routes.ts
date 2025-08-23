import { router } from "../../trpc.ts";
import { checkUsername } from "./checkUsername.ts";
import { login } from "./login.ts";
import { signup } from "./signup.ts";
import { userInfo } from "./userInfo.ts";

export const usersRouter = router({
  signup,
  checkUsername,
  login,
  userInfo,
});
