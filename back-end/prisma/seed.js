const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  const adminPassword = bcrypt.hashSync('admin123', saltRounds);

  await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
    },
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