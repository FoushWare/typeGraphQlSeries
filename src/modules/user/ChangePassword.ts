import bcrypt from "bcryptjs";

import { redis } from "./../../redis";
import { ChangePasswordInput } from "./changepassword/ChangePasswordInput";
import { forgetPasswordPrefix } from "./../constants/redisPrefixes";
import { User } from "./../../entity/User/User";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import "reflect-metadata";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User)
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    // get the userId form the token stored in redis DB
    const userId = await redis.get(forgetPasswordPrefix + token);
    if (!userId) return null;
    const user = await User.findOne(userId);
    if (!user) return null;
    await redis.del(forgetPasswordPrefix + token);
    user.password = await bcrypt.hash(password, 12); // you must put await before bcrypt ... i forget it so it complained
    await user.save();
    ctx.req.session!.userId = user.id;
    return user;
  }
}
