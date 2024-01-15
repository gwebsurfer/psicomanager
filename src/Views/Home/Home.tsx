import { useEffect } from 'react';
import { Post } from '../../typings/post';
import useApi from '../../hooks/useApi';
import { PostsList } from '../../components/PostsList/PostsList';
import { useApiData } from '../../providers/ApiDataProvider';
import { useModal } from '../../providers/ModalProvider';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { UtilityBar } from '../../components/UtilityBar/Utilitybar';

export const Home = () => {
  const { posts } = useApiData();
  const { isModalOpen, closeModal, deletePost } = useModal();
  const { loading, error, getData } = useApi<Post>();

  useEffect(() => {
    getData('posts');
  }, [getData]);

  if (loading) return <div>Carregando...</div>;

  if (error && error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <section className='mt-16 pt-8 bg-[url("assets/bg-home.png")] bg-dark/[0.02] bg-fixed bg-contain bg-no-repeat bg-right-top bg-opacity-10'>
      <div className='container mx-auto'>
        <UtilityBar />
        <PostsList posts={posts} />
        <DeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={deletePost}
        />
      </div>
    </section>
  );
};
