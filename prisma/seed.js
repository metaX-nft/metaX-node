const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const tasks = [
  { title: "Follow @chainlink", accountId: "63727313" },
  { title: "Follow @CoinMarketCap", accountId: "483472302" },
  { title: "Follow @Binance", accountId: "3274824" }
];

async function main() {
  const taskList = await prisma.task.createMany({
    data: tasks,
  });
  console.log(taskList);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
