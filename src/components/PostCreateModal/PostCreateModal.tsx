import { useState } from 'react';
import { motion } from 'framer-motion';
import { Post } from '../../typings/post';
import { useApiData } from '../../providers/ApiDataProvider';
import { newPost } from '../../typings/newPost';
import { PrimaryButton } from '../Button/Button';

interface PostCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
}

export const PostCreateModal = ({
  isOpen,
  onClose,
  posts,
}: PostCreateModalProps) => {
  const { createPost } = useApiData();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const handleCreatePost = async () => {
    setTitleError('');
    setBodyError('');

    if (posts.some((post) => post.title === title)) {
      setTitleError(
        'Já existe um post com este título. Por favor, digite um título diferente.'
      );
      return;
    }

    if (!body.trim()) {
      setBodyError('O campo de conteúdo não pode estar em branco.');
      return;
    }

    const newPostData: newPost = { userId: 1, title, body };
    await createPost(newPostData);
    setTitle('');
    setBody('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      transition={{ duration: 0.5 }}
      className='fixed inset-0 z-50 bg-dark bg-opacity-70 flex items-center justify-center'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className='relative p-6 bg-light shadow-2xl max-w-xl sm:w-[500px] rounded-xl'
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 mt-2 mr-2 text-lg font-bold text-dark hover:opacity-15'
          aria-label='Fechar'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
          >
            <path
              d='M3.52925 3.52858C3.7896 3.26823 4.21171 3.26823 4.47206 3.52858L8.00065 7.05717L11.5292 3.52858C11.7896 3.26823 12.2117 3.26823 12.4721 3.52858C12.7324 3.78892 12.7324 4.21103 12.4721 4.47138L8.94346 7.99998L12.4721 11.5286C12.7324 11.7889 12.7324 12.211 12.4721 12.4714C12.2117 12.7317 11.7896 12.7317 11.5292 12.4714L8.00065 8.94279L4.47206 12.4714C4.21171 12.7317 3.7896 12.7317 3.52925 12.4714C3.2689 12.211 3.2689 11.7889 3.52925 11.5286L7.05784 7.99998L3.52925 4.47138C3.2689 4.21103 3.2689 3.78892 3.52925 3.52858Z'
              fill='#637381'
            />
          </svg>
        </button>
        <h2 className='text-xl font-bold text-secondary mb-6 text-center'>
          Criar Nova Postagem
        </h2>
        <section>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Título da postagem'
            className='mb-3 p-2 text-sm text-secondary font-light rounded-md w-full'
            id='title'
            name='title'
            type='text'
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='Conteúdo da postagem'
            className='mb-1 p-2 text-sm text-secondary font-light rounded-md w-full'
            id='body'
            name='body'
            rows={4}
          />
          <div className='flex justify-start'>
            {titleError && <p className='text-red-600 text-xs'>{titleError}</p>}
            {bodyError && <p className='text-red-600 text-xs'>{bodyError}</p>}
          </div>
          <div className='mt-4 flex justify-end'>
            <PrimaryButton onClick={handleCreatePost}>
              Salvar Postagem
            </PrimaryButton>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};
