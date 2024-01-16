import { Comment } from './comment';
import { User } from './user';
import { newPost } from './newPost';
import { Post } from './post';

export type NewData = Post | newPost | Comment | User;
