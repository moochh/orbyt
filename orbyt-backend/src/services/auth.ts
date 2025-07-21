import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { PrismaClient, User } from '@prisma/client';
import { BadRequestError } from '../errors';

import type { StringValue } from 'ms';
import { LoginParams, SignupParams } from '../types/auth';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const findUser = async ({ emailAddress, password }: LoginParams) => {
  const user = await prisma.user.findUnique({
    where: { emailAddress: emailAddress },
  });

  const isValid = user && (await argon2.verify(user.passwordHash, password));

  if (!isValid) throw new BadRequestError('INVALID_CREDENTIALS');

  return user;
};

export const generateAccessToken = (user: User) => {
  const payload = {
    sub: user.id,
    emailAddress: user.emailAddress,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as StringValue });
};

export const createUser = async ({ emailAddress, password, firstName, lastName }: SignupParams) => {
  const existingUser = await prisma.user.findUnique({
    where: { emailAddress: emailAddress },
  });

  if (existingUser) throw new BadRequestError('USER_ALREADY_EXISTS');

  const hashedPassword = await argon2.hash(password);

  return await prisma.user.create({
    data: {
      emailAddress: emailAddress,
      passwordHash: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    },
  });
};
