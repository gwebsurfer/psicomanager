import { Post } from '../../typings/post';
import { PostCard } from '../PostCard/PostCard';

type PostsListProps = {
  posts: Post[];
};

export const PostsList = ({ posts }: PostsListProps) => {
  const sortedPosts = [...posts].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className='container mx-auto'>
      {sortedPosts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
