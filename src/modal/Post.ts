import { Schema, model } from 'mongoose';
import { IPost } from '../types/postType';


const Post = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

export default model<IPost>('Post', Post);