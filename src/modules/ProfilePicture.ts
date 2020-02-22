import { Upload } from "./../types/Upload";
import { Resolver, Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg("picture", () => GraphQLUpload) { filename, createReadStream }: Upload
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      createReadStream().pipe(
        createWriteStream(__dirname + `/../images/${filename}`)).on("finish",()=>resolve(true)).on("error",()=> reject(false))
      );
    );
  }
}
