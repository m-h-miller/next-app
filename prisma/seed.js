const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const users = await prisma.user.findMany();
  console.log({ users });
  
  const user = await prisma.user.create({
    data: {
        name: "Satoshi",
        email: "Satoshi.Nakamoto@gmail.com"
    }
  });
  console.log({ user });

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })