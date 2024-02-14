import { Request, Response } from 'express';

interface ICustomResponse<T> {
  data?: T | undefined;
  message: string;
  status: number;
}

class CustomResponse {
  req: Request;
  res: Response;
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }
  static success<T>(
    data: T,
    message: string,
    status: number,
  ): ICustomResponse<T> {
    return {
      data,
      message,
      status,
    };
  }
  static error<T>(
    data: T,
    message: string,
    status: number,
  ): ICustomResponse<T> {
    return {
      data,
      message,
      status,
    };
  }

  send<T>(data: T, message: string, status: number): Response {
    return this.res.status(status).json({ data, message, status });
  }
}

export default CustomResponse;
