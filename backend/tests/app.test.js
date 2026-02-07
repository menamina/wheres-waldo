const request = require("supertest");

jest.mock("../prisma/client", () => ({
  person: {
    findFirst: jest.fn(),
  },
  player: {
    update: jest.fn(),
  },
}));

const prisma = require("../prisma/client");
const server = require("./app");

afterEach(() => {
  jest.clearAllMocks();
});

test("start time returns 0", async () => {
  const res = await request(server).get("/start");
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ startTime: 0 });
});

test("handles click out of bounds", async () => {
  prisma.person.findFirst.mockResolvedValue({
    name: "Wilma",
    xMin: 0.6,
    xMax: 0.8,
    yMin: 0.6,
    yMax: 0.8,
  });
  const res = await request(server)
    .post("/click")
    .send({ x: 0, y: 0, person: "Wilma" });

  expect(prisma.person.findFirst).toHaveBeenCalledWith({
    where: {
      name: "Wilma",
    },
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ message: false });
});

test("handles click in bounds", async () => {
  prisma.person.findFirst.mockResolvedValue({
    name: "Wilma",
    xMin: 0.6,
    xMax: 0.8,
    yMin: 0.6,
    yMax: 0.8,
  });
  const res = await request(server)
    .post("/click")
    .send({ x: 0.7, y: 0.7, person: "Wilma" });

  expect(prisma.person.findFirst).toHaveBeenCalledWith({
    where: {
      name: "Wilma",
    },
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ message: true, person: "Wilma" });
});

test("timer stops when all characters found", async () => {
  prisma.player.update.mockResolvedValue({ id: 1 });

  const res = await request(server).patch("/stop").send({
    elapsed: 50000,
  });

  expect(prisma.player.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: { end: 50000 },
  });

  expect(res.statusCode).toBe(200);
});
