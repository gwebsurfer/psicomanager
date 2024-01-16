import { useEffect, useState } from 'react';
import { Post } from '../../typings/post';
import useApi from '../../hooks/useApi';
import { PostsList } from '../../components/PostsList/PostsList';
import { useApiData } from '../../providers/ApiDataProvider';
import { useModal } from '../../providers/ModalProvider';
import { ConfirmPostDeleteModal } from '../../components/ConfirmPostDeleteModal/ConfirmPostDeleteModal';
import { UtilityBar } from '../../components/UtilityBar/Utilitybar';
import { ModalTypes } from '../../typings/modalTypes';
import { PostCreateModal } from '../../components/PostCreateModal/PostCreateModal';
import { CommentsModal } from '../../components/CommentsModal/CommentsModal';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

export const Home = () => {
  const { posts } = useApiData();
  const { isModalOpen, modalType, closeModal, deletePost } = useModal();
  const { loading, error, getData } = useApi<Post>();
  const [currentPostId, setCurrentPostId] = useState<number>(-1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getData('posts');
  }, [getData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const NoPostsFound = () => (
    <div className='flex items-center justify-center -mt-48 h-screen'>
      <h2 className='text-secondary text-lg font-light'>
        Nenhum post encontrado
      </h2>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  if (error && error instanceof Error) return <div>Erro: {error.message}</div>;

  const filteredPosts = posts.filter(
    (post) =>
      post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasPosts = filteredPosts.length > 0;

  return (
    <section className='mt-16 pt-8 bg-[url("assets/bg/bg-home.png")] bg-dark/[0.02] bg-fixed bg-contain bg-no-repeat bg-right-top bg-opacity-10'>
      <div className='container sm:max-w-5xl mx-auto'>
        <UtilityBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        {!hasPosts && <NoPostsFound />}
        {hasPosts && (
          <PostsList
            posts={filteredPosts}
            setCurrentPostId={setCurrentPostId}
          />
        )}
        {isModalOpen && modalType === ModalTypes.POST_DELETE && (
          <ConfirmPostDeleteModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onDelete={deletePost}
          />
        )}
        {isModalOpen && modalType === ModalTypes.POST_CREATE && (
          <PostCreateModal
            isOpen={isModalOpen}
            onClose={closeModal}
            posts={posts}
          />
        )}
        {isModalOpen && modalType === ModalTypes.COMMENTS && (
          <CommentsModal
            isOpen={isModalOpen}
            onClose={closeModal}
            postId={currentPostId}
          />
        )}
      </div>
    </section>
  );
};
