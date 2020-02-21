import { redis } from "./../../redis";
import { User } from "./../../entity/User/User";
import { Resolver, Mutation, Arg } from "type-graphql";
import "reflect-metadata";

@Resolver()
export class ConfirmResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(token);
    if (!userId) {
      return false;
    }
    //update the user confirm status in User entiry in the DB
    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(token);
    return true;
  }
}
