import { MyContext } from "./../../types/MyContext";
import { Resolver, Ctx, Mutation } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    // i used promise because destory need a call backfunc
    return new Promise((res, rej) => {
      ctx.req.session!.destroy(err => {
        // this destroy the session not the cookie
        if (err) {
          console.log(err);
          return rej(false);
        }
        ctx.res.clearCookie("qid");
        return res(true);
      });
    });
  }
}
