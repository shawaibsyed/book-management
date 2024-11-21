import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resetDatabase = async () => {
  await prisma.book.deleteMany(); // Clear the books table
};
