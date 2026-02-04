const { prisma } = require("./client");

async function seed() {
  await prisma.person.createMany({
    data: [
      { name: "Waldo", xMin: 0.6152, xMax: 0.6242, yMin: 0.3513, yMax: 0.3688 },
      {
        name: "Wizard",
        xMin: 0.2664,
        xMax: 0.2758,
        yMin: 0.3244,
        yMax: 0.3513,
      },
      {
        name: "Wilma",
        xMin: 0.7695,
        xMax: 0.7785,
        yMin: 0.3869,
        yMax: 0.4019,
      },
    ],
  });

  await prisma.player.upsert({
    where: { id: 1 },
    update: { start: 0, end: 0 },
    create: { id: 1, start: 0, end: 0 },
  });

  console.log("seeding complete");
}

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
