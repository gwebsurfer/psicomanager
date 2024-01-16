import { Post } from '../../typings/post';
import { PostCard } from '../PostCard/PostCard';

type PostsListProps = {
  posts: Post[];
  setCurrentPostId: (postId: number) => void;
};

export const PostsList = ({ posts, setCurrentPostId }: PostsListProps) => {
  const sortedPosts = [...posts].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className='mb-16'>
      {sortedPosts.map((post) => (
        <PostCard
          post={post}
          key={post.id}
          setCurrentPostId={setCurrentPostId}
        />
      ))}
    </div>
  );
};
