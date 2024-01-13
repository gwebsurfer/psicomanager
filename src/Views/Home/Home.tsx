import { useEffect } from 'react';
import { Post } from '../../typings/post';
import useApi from '../../hooks/useApi';

export const Home = () => {
  const { data: posts, loading, error, getData } = useApi<Post>();

  useEffect(() => {
    getData('posts');
  }, [getData]);

  if (loading) return <div>Carregando...</div>;

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    return <div>Erro: {errorMessage}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};
