import { motion } from 'framer-motion';
import { useModal } from '../../providers/ModalProvider';
import { ModalTypes } from '../../typings/modalTypes';
import { PrimaryButton } from '../Button/Button';

export const UtilityBar = ({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { openModal } = useModal();

  const handlePostCreateModal = () => {
    openModal(ModalTypes.POST_CREATE);
  };

  return (
    <motion.section
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='max-h-16 mb-6 bg-dark bg-opacity-5 backdrop-blur-sm border border-light sm:rounded-lg mx-4'
    >
      <div className='p-3 sm:py-3 sm:px-6 flex items-center justify-between'>
        <PrimaryButton
          onClick={() => handlePostCreateModal()}
          icon={
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6 2C6.27614 2 6.5 2.22386 6.5 2.5V5.5H9.5C9.77614 5.5 10 5.72386 10 6C10 6.27614 9.77614 6.5 9.5 6.5H6.5V9.5C6.5 9.77614 6.27614 10 6 10C5.72386 10 5.5 9.77614 5.5 9.5V6.5H2.5C2.22386 6.5 2 6.27614 2 6C2 5.72386 2.22386 5.5 2.5 5.5H5.5V2.5C5.5 2.22386 5.72386 2 6 2Z'
                fill='#ffffff'
              />
            </svg>
          }
        >
          Nova Postagem
        </PrimaryButton>
        <div className='flex rounded-md'>
          <div className='relative flex items-stretch flex-grow focus-within:z-10'>
            <input
              type='text'
              name='search'
              id='search'
              value={searchTerm}
              onChange={onSearchChange}
              className='w-60 sm:w-96 focus:ring-indigo-500 focus:border-indigo-500 block rounded-none rounded-l-md pl-4 text-xs border-gray-300'
              placeholder='Pesquisar por título'
            />
            <button className='p-2 rounded-r-md text-sm font-medium bg-white text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.66732 2.66671C4.45818 2.66671 2.66732 4.45757 2.66732 6.66671C2.66732 8.87585 4.45818 10.6667 6.66732 10.6667C8.87646 10.6667 10.6673 8.87585 10.6673 6.66671C10.6673 4.45757 8.87646 2.66671 6.66732 2.66671ZM1.33398 6.66671C1.33398 3.72119 3.7218 1.33337 6.66732 1.33337C9.61284 1.33337 12.0007 3.72119 12.0007 6.66671C12.0007 7.89918 11.5826 9.03401 10.8806 9.93714L14.4721 13.5286C14.7324 13.789 14.7324 14.2111 14.4721 14.4714C14.2117 14.7318 13.7896 14.7318 13.5292 14.4714L9.93775 10.8799C9.03462 11.582 7.89979 12 6.66732 12C3.7218 12 1.33398 9.61223 1.33398 6.66671Z'
                  fill='#6D768B'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
