const { prisma } = require("../prisma/client");

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

module.exports = {
  isClickABullseye,
};
