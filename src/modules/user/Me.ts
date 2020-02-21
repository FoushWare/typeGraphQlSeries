import { MyContext } from "./../../types/MyContext";
import { User } from "./../../entity/User/User";
import { Resolver, Query, Ctx } from "type-graphql";
import "reflect-metadata";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    if (!ctx.req.session!.userId) {
      return null;
    }
    return User.findOne(ctx.req.session!.userId);
  }
}
