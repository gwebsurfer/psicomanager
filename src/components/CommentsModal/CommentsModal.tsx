import { useApiData } from '../../providers/ApiDataProvider';
import { Comment } from '../../typings/comment';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

export const CommentsModal = ({
  isOpen,
  onClose,
  postId,
}: CommentsModalProps) => {
  const { comments } = useApiData();

  const filteredComments = comments.filter(
    (comment: Comment) => comment.postId === postId
  );

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto bg-dark bg-opacity-70 flex'>
      <div className='relative p-6 bg-white shadow-2xl max-w-2xl max-h-[50%] m-auto flex-col flex rounded-xl overflow-hidden'>
        <button
          onClick={onClose}
          className='absolute top-0 right-0 mt-3 mr-3 text-lg font-bold text-dark hover:opacity-15'
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
        <h2 className='text-xl font-bold text-secondary mb-4 text-center'>
          {filteredComments.length} comentários
        </h2>
        <div className='overflow-y-auto max-h-[60vh]'>
          {filteredComments.map((comment: Comment) => (
            <div key={comment.id} className='mb-2 p-4 px-8 rounded-lg'>
              <div className='grid grid-cols-12 gap-8 mb-1'>
                <div className='m-auto bg-light w-10 h-10 rounded-full col-span-1'>
                  <p className='py-3 text-xs text-center text-dark font-light'>
                    {comment.id}
                  </p>
                </div>
                <div className='col-span-11'>
                  <p className='font-semibold text-sm mb-1'>
                    {capitalizeFirstLetter(comment.name)}
                  </p>
                  <p className='font-light text-dark text-xs mb-3'>
                    {comment.email}
                  </p>
                  <p className='text-xs text-dark'>
                    {capitalizeFirstLetter(comment.body)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
