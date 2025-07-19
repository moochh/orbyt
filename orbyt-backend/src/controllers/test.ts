import { Request, Response } from 'express';
import { addUser } from '../services/test';

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
