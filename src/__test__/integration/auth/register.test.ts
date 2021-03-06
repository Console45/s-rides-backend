import supertest, { SuperTest, Test } from "supertest";
import app from "../../../app";
import User from "../../../models/User";

const request: SuperTest<Test> = supertest(app);
const registerUrl: string = "/auth/register";

describe(registerUrl, () => {
  const testUser = {
    fullname: "test user",
    email: "testuser@test.com",
    password: "testpassword",
    studentId: "10817438",
  };
  beforeEach(async () => {
    await User.deleteMany({});
  });
  test(`POST ${registerUrl}`, async () => {
    const response = await request.post(registerUrl).send(testUser);
    expect(response.status).toBe(201);
    expect(response.body).not.toBeEmpty();
    expect(response.body).toHaveProperty("status", "success");
  });
  it(`should return 409 on duplicate email with POST ${registerUrl}`, async () => {
    await new User(testUser).save();
    const response = await request.post(registerUrl).send(testUser);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("status", "error");
  });
  it(`should return 400 on malformed data with POST ${registerUrl}`, async () => {
    const response = await request
      .post(registerUrl)
      .send({ fullname: testUser.fullname, email: testUser.email });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
  });
});
