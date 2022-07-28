import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('12345678', 10);
  const userParams = {
    name: 'Edison',
    email: 'edison@yavar.in',
    hash,
    confirmed_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  };
  return prisma.user.upsert({
    where: { id: 1 },
    update: userParams,
    create: userParams,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
  });
