import { Connection } from "typeorm";
import faker from "faker";
import { testConn } from "../../test-utils/testConn";
import { User } from "../../../src/entity/User/User";
import { gCall } from "../../../src/test-utils/gCall";

//make a connection to the DB
//beforeAll  runs before tests
let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const meQuery = `
query {
  me{
    id
    firstName
    email
    lastName
    name
  }
}
`;

describe("Me", () => {
  test("get User", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }).save();

    // console.log(
    const response = await gCall({
      source: meQuery,
      userId: user.id
    });

    // console.log(response);
    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });

    // );
  });

  it("return null", async () => {
    const response = await gCall({
      source: meQuery
    });

    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  });
});
