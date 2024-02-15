import { Types } from 'mongoose';

export interface IComment {
  name: string;
  email: string;
  comment: string;
  status: boolean;
  blogId: Types.ObjectId;
  date: Date;
}
