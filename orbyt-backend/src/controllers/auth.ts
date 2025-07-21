import { Request, Response } from 'express';
import { createUser, generateAccessToken, findUser } from '../services/auth';
import { BadRequestError } from '../errors';

export const login = async (req: Request, res: Response) => {
  const { emailAddress, password } = req.body;

  const user = await findUser({ emailAddress, password });
  const accessToken = generateAccessToken(user);

  res.status(200).json({
    accessToken,
  });
};

export const signup = async (req: Request, res: Response) => {
  const { emailAddress, password, firstName, lastName } = req.body;

  if (password.length < 8) throw new BadRequestError('PASSWORD_TOO_SHORT');

  const user = await createUser({
    emailAddress,
    password,
    firstName,
    lastName,
  });

  res.status(201).json({
    id: user.id,
    email: user.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
  });
};
