const request = require("supertest");
const { server } = require("./app");

Test("start time returns 0", (done) => {
  request(server)
    .get("/start")
    .expect("Content-Type", /json/)
    .expect({ startTime: 0 });
});
