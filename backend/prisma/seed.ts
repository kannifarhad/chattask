import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Optional: clean the DB before seeding
  await prisma.message.deleteMany();

  const messages = Array.from({ length: 100 }, () => ({
    username: faker.internet.username(),
    content: faker.lorem.sentence(),
  }));

  await prisma.message.createMany({
    data: messages,
  });

  console.log('✅ Seeded 100 messages');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
