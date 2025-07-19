import { Request, Response } from 'express';
import { addUser, getUsers } from '../services/test';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json({
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { emailAddress, password, firstName, lastName } = req.body;

  try {
    const user = await addUser(emailAddress, password, firstName, lastName);
    res.json({
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
};
