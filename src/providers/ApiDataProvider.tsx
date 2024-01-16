import React, { createContext, useContext, useEffect, useState } from 'react';
import { Post } from '../typings/post';
import { Comment } from '../typings/comment';
import { User } from '../typings/user';
import useApi from '../hooks/useApi';
import { NewPost } from '../typings/newPost';

type ApiDataContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  createPost: (post: NewPost) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
};

type Props = { children: React.ReactNode };

const ApiDataContext = createContext<ApiDataContextType | undefined>(undefined);

export const useApiData = () => {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error('useApiData must be used within a ApiDataProvider');
  }
  return context;
};

export const ApiDataProvider: React.FC<Props> = ({ children }) => {
  const { getData: getPosts, create, deleteData } = useApi<Post>();
  const [posts, setPosts] = useState<Post[]>([]);
  const { getData: getComments } = useApi<Comment>();
  const [comments, setComments] = useState<Comment[]>([]);
  const { getData: getUsers } = useApi<User>();
  const [users, setUsers] = useState<User[]>([]);

  const createPost = async (postData: NewPost) => {
    const createdPost = await create('posts', postData);
    if (createdPost) {
      setPosts((currentPosts) => [...currentPosts, createdPost as Post]);
    }
  };

  const deletePost = async (id: number) => {
    await deleteData('posts', id);
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    getPosts('posts').then((data) => setPosts(data));
    getComments('comments').then((data) => setComments(data));
    getUsers('users').then((data) => setUsers(data));
  }, [getPosts, getComments, getUsers]);

  return (
    <ApiDataContext.Provider
      value={{
        posts,
        setPosts,
        comments,
        setComments,
        users,
        setUsers,
        createPost,
        deletePost,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
