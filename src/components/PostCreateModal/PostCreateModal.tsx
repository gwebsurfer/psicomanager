import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useApiData } from '../../providers/ApiDataProvider';
import { Post } from '../../typings/post';
import { NewPost } from '../../typings/newPost';
import { PrimaryButton } from '../Button/Button';

interface PostCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
}

const postCreateSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(2),
});

type PostCreateSchema = z.infer<typeof postCreateSchema>;

export const PostCreateModal = ({ isOpen, onClose }: PostCreateModalProps) => {
  const { createPost } = useApiData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreateSchema>({
    resolver: zodResolver(postCreateSchema),
  });

  const handleCreatePost = async (data: PostCreateSchema) => {
    const newPostData: NewPost = {
      userId: 1,
      title: data.title,
      body: data.body,
    };

    await createPost(newPostData);
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
          Criar nova postagem
        </h2>
        <form onSubmit={handleSubmit(handleCreatePost)}>
          <input
            {...register('title')}
            placeholder='Título da postagem'
            className='mb-3 p-2 text-sm text-secondary font-light rounded-md w-full'
            id='title'
            type='text'
          />
          {errors.title?.message && (
            <p className='mb-4 text-xs text-red-500'>
              Digite um título para a postagem.
            </p>
          )}
          <textarea
            {...register('body')}
            placeholder='Conteúdo da postagem'
            className='mb-1 p-2 text-sm text-secondary font-light rounded-md w-full'
            id='body'
            rows={4}
          />
          {errors.body?.message && (
            <p className='mb-4 text-xs text-red-500'>
              Digite o conteúdo da postagem.
            </p>
          )}
          <div className='mt-4 flex justify-end'>
            <PrimaryButton type='submit'>Salvar Postagem</PrimaryButton>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
