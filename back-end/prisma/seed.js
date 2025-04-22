const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  const adminPassword = bcrypt.hashSync('admin123', saltRounds);
  const userPassword = bcrypt.hashSync('user123', saltRounds);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
      role: 1,
    },
  });

  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        password: userPassword,
        role: 2,
      },
    });
    users.push(user);
  }

  const months = [
    '01/2024', '02/2024', '03/2024', '04/2024', '05/2024', '06/2024',
    '07/2024', '08/2024', '09/2024', '10/2024', '11/2024', '12/2024'
  ];

  for (const user of users) {
    for (const month of months) {
      const value = Math.floor(Math.random() * (2300 - 1500 + 1)) + 1500;
      await prisma.monthlyValue.create({
        data: {
          month,
          value,
          userId: user.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });