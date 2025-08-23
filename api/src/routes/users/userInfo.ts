import { authorizedProcedure } from "../../trpc.ts";

export type UserInfoResults = {
  username: string;
};

export const userInfo = authorizedProcedure.query(async (opts) => {
  return {
    username: opts.ctx.user.username,
  };
});
