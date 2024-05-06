const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const tasks = [
  { title: "Task 1", description: "Description for Task 1" },
  { title: "Task 2", description: "Description for Task 2" },
  { title: "Task 3", description: "Description for Task 3" },
  { title: "Task 4", description: "Description for Task 4" },
  { title: "Task 5", description: "Description for Task 5" },
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
