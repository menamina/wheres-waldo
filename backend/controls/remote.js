const prisma = require("../prisma/client");

async function startTimer(req, res) {
  try {
    const player = await prisma.player.findUnique({
      where: {
        id: 1,
      },
    });

    if (player) {
      res.json({
        startTime: player.start,
      });
    }
  } catch (error) {
    console.log("error @ startTime", error.message);
  }
}

async function isClickABullseye(req, res) {
  try {
    const { x, y, person } = req.body;
    const clickX = Number(x);
    const clickY = Number(y);

    const character = await prisma.person.findUnique({
      where: {
        name: person,
      },
    });

    console.log(character);

    const xMin = character.xMin;
    const xMax = character.xMax;
    const yMin = character.yMin;
    const yMax = character.yMax;

    if (clickX >= xMin && clickX <= xMax && clickY >= yMin && clickY <= yMax) {
      return res.json({
        message: true,
        person: character.name,
      });
    } else {
      return res.json({
        message: false,
      });
    }
  } catch (error) {
    console.log("error @ isClickABullseye", error.message);
  }
}

async function stopTimer(req, res) {
  try {
  } catch (error) {
    console.log("error @ endTime", error.message);
  }
}

module.exports = {
  startTimer,
  isClickABullseye,
  stopTimer,
};
