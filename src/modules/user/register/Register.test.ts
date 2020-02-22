import { gCall } from "./../../../test-utils/gCall";
import { testConn } from "./../../../test-utils/testConn";
import { Connection } from "typeorm";
import faker from "faker";
import "reflect-metadata";

import { User } from "../../../entity/User/User";

//make a connection to the DB
//beforeAll  runs before tests
let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation register($data:RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    email
    lastName
  }
}
`;

describe("Register", () => {
  test("create User", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    // console.log(
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toBe(user.firstName);

    // );
  });
});
