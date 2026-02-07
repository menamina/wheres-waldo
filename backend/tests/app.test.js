const request = require("supertest");

jest.mock("../prisma/client", () => ({
  person: {
    findUnique: jest.fn(),
  },
}));

const prisma = require("../prisma/client");

const { server } = require("./index");

test("start time returns 0", async () => {
  const res = await request(server).get("/start");
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ startTime: 0 });
});

test("handles click out of bounds", async () => {
  prisma.person.findUnique.mockResolvedValue({
    name: "Wilma",
    xMin: 0.6,
    xMax: 0.8,
    yMin: 0.6,
    yMax: 0.8,
  });
  const res = await request(server)
    .post("/click")
    .send({ x: 0, y: 0, person: "Wilma" });

  expect(prisma.person.findUnique).toHaveBeenCalledWith({
    where: {
      name: "Wilma",
    },
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ message: false });
});

test("handles click in bounds", async () => {
  prisma.person.findUnique.mockResolvedValue({
    name: "Wilma",
    xMin: 0.6,
    xMax: 0.8,
    yMin: 0.6,
    yMax: 0.8,
  });
  const res = await request(server)
    .post("/click")
    .send({ x: 7, y: 7, person: "Wilma" });

  expect(prisma.person.findUnique).toHaveBeenCalledWith({
    where: {
      name: "Wilma",
    },
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ message: true, person: "Wilma" });
});

// test("timer stops when all characters found", async () => {
//   const res = await request(server).patch("/stop").send({
//     elapsed: 50000,
//   });

//   expect(res.statusCode).toBe(200);
// });
