const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Verificando se o banco de dados já contém dados...');

  // Verifica se já existem usuários no banco de dados
  const existingUsers = await prisma.user.findFirst();
  if (existingUsers) {
    console.log('Dados já existem no banco. Seed não será executado.');
    return;
  }

  console.log('Criando usuário admin...');
  const saltRounds = 10;
  const adminPassword = bcrypt.hashSync('admin123', saltRounds);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
    },
  });

  console.log('Usuário admin criado:', admin);

  console.log('Criando tarefas...');
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
  console.log('Tarefas criadas com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });