import { ChangePasswordResolver } from "./../modules/user/ChangePassword";
import { ConfirmResolver } from "./../modules/user/Confirm";
import { ForgetPasswordResolver } from "./../modules/user/ForgetPassword";
import { loginResolver } from "./../modules/user/login";
import { RegisterResolver } from "./../modules/user/Register";
import { MeResolver } from "./../modules/user/Me";
import { CreateUserResolver } from "./../modules/CreateUser";
import { LogoutResolver } from "./../modules/user/Logout";
import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmResolver,
      ForgetPasswordResolver,
      loginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver
      // CreateProductResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
