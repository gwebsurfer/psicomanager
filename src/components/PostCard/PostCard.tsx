import { Post } from '../../typings/post';
import { OptionsIconsGroup } from '../OptionsIconsGroup/OptionsIconsGroup';

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className='bg-white backdrop-blur-sm bg-opacity-70 rounded-lg py-6 px-8 mb-2 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-6'>
      <div className='m-auto bg-light w-10 h-10 rounded-full col-span-1'>
        <p className='py-3 text-xs text-center text-dark font-light'>
          {post.id}
        </p>
      </div>
      <div className='col-span-10'>
        <h2 className='mb-2 text-lg font-semibold'>
          {capitalizeFirstLetter(post.title)}
        </h2>
        <p className='text-sm font-light'>{capitalizeFirstLetter(post.body)}</p>
      </div>
      <div className='my-auto'>
        <OptionsIconsGroup postId={post.id} />
      </div>
    </div>
  );
};
