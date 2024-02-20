import { Request, Response, NextFunction } from 'express';

type IsampleUser = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const sampleUsers: IsampleUser[] = [
  {
    name: 'Elyse',
    email: 'elyse@gmail.com',
    password: '123456',
    role: 'admin',
  },
  {
    name: 'John',
    email: 'john@yahoo.fr',
    password: '123456',
    role: 'user',
  },
  {
    name: 'fiona',
    email: 'fiona@gmail.com',
    password: '123456',
    role: 'user',
  },
];

interface IRequest extends Request {
  user?: IsampleUser;
}

export const CheckUserAuth = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.headers;
    const user = sampleUsers.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
export const CheckUserRole = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  console.log(user);
  if (user?.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
