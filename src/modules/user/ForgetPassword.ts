import { forgetPasswordPrefix } from "./../constants/redisPrefixes";
import { User } from "./../../entity/User/User";
import { Resolver, Mutation, Arg } from "type-graphql";
import "reflect-metadata";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { sendEmail } from "../utils/sendEmail";

@Resolver()
export class ForgetPasswordResolver {
  @Mutation(() => Boolean)
  async forgetPassword(@Arg("email") email: string): Promise<boolean> {
    //check existance of the user with this email in the DB
    const user = await User.findOne({ email });
    if (!user) {
      return true; // true or false not a big dell there
    }
    // send email to the user to change his email
    const token = v4();
    await redis.set(forgetPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1d day expiration
    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`
    );

    return true;
  }
}
