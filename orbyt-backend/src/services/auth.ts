import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  return user;
};
