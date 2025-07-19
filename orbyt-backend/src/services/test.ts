import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });
};

export const addUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  return prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });
};
