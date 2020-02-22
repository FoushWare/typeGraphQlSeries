import { gCall } from "./../../../test-utils/gCall";
import { testConn } from "./../../../test-utils/testConn";
import { Connection } from "typeorm";

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
    name
  }
}
`;

describe("Register", () => {
  it("create User", async () => {
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: "foush",
            lastName: "foush",
            email: "admin2@gmail.com",
            password: "hifoush223"
          }
        }
      })
    );
  });
});
