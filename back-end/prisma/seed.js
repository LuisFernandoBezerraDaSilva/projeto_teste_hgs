const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  // Criação do usuário admin com senha criptografada
  const adminPassword = bcrypt.hashSync('admin123', saltRounds);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
    },
  });

  // Adicionando tarefas para o usuário admin
  await prisma.task.createMany({
    data: [
      {
        title: 'Primeira Tarefa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        userId: admin.id,
      },
      {
        title: 'Segunda Tarefa',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        userId: admin.id,
      },
      {
        title: 'Terceira Tarefa',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        userId: admin.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });