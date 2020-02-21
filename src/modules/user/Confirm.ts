import { confirmationPrefix } from "./../constants/redisPrefixes";
import { redis } from "./../../redis";
import { User } from "./../../entity/User/User";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import "reflect-metadata";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ConfirmResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("token") token: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const userId = await redis.get(confirmationPrefix + token);
    if (!userId) {
      return false;
    }
    //update the user confirm status in User entiry in the DB
    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(confirmationPrefix + token);
    ctx.req.session!.userId = userId;

    return true;
  }
}
