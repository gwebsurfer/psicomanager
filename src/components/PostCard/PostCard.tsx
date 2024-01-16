import { useModal } from '../../providers/ModalProvider';
import { ModalTypes } from '../../typings/modalTypes';
import { Post } from '../../typings/post';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { OptionsIconsGroup } from '../OptionsIconsGroup/OptionsIconsGroup';

type PostCardProps = {
  post: Post;
  setCurrentPostId: (postId: number) => void;
};

export const PostCard = ({ post, setCurrentPostId }: PostCardProps) => {
  const { openModal } = useModal();

  const handlePostClick = (postId: number) => {
    openModal(ModalTypes.COMMENTS, postId);
    setCurrentPostId(post.id);
  };

  return (
    <div className='bg-white backdrop-blur-sm bg-opacity-70 rounded-lg py-6 px-8 mb-2 mx-6 sm:mx-4 shadow-lg grid grid-cols-1 sm:grid-cols-12 gap-6 hover:bg-opacity-100'>
      <button
        onClick={() => handlePostClick(post.id)}
        className='m-auto bg-light w-10 h-10 rounded-full col-span-12 sm:col-span-2 md:col-span-1'
      >
        <p className='py-3 text-xs text-center text-dark font-light'>
          {post.id}
        </p>
      </button>
      <button
        onClick={() => handlePostClick(post.id)}
        className='col-span-12 sm:col-span-8 md:col-span-10'
      >
        <h2 className='mb-2 text-lg font-semibold text-left'>
          {capitalizeFirstLetter(post.title)}
        </h2>
        <p className='text-sm text-left font-light'>
          {capitalizeFirstLetter(post.body)}
        </p>
      </button>
      <div className='my-auto col-span-12 sm:col-span-2 md:col-span-1'>
        <OptionsIconsGroup postId={post.id} />
      </div>
    </div>
  );
};
