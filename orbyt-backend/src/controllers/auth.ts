import { Request, Response } from 'express';
import { loginUser } from '../services/auth';

export const login = async (req: Request, res: Response) => {
  const { emailAddress, password } = req.body;

  try {
    const user = await loginUser(emailAddress, password);
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
    res.status(400).json({ message: err.message });
  }
};
