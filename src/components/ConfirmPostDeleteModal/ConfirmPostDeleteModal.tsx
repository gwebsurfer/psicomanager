import { motion } from 'framer-motion';
import AlertIcon from '../../assets/icons/alert.svg';

export const ConfirmPostDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      transition={{ duration: 0.5 }}
      className='fixed inset-0 z-50 overflow-auto bg-dark bg-opacity-70 flex'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className='relative p-8 bg-white shadow-2xl w-[80%] lg:w-[50%] max-w-md m-auto flex-col flex rounded-xl'
      >
        <div className='text-center mb-4'>
          <img
            src={AlertIcon}
            alt='Logo'
            role='img'
            className='h-14 w-auto m-auto mb-4'
          />
          <h2 className='text-2xl font-bold text-red-500 mb-2'>Atenção</h2>
          <p className='text-secondary'>
            Ao excluir esta postagem os comentários também serão excluídos.
          </p>
        </div>
        <div className='flex justify-center gap-3 mt-4'>
          <button
            onClick={onClose}
            className='px-8 py-2 w-36 rounded-md text-md text-secondary bg-white border border-dark hover:bg-slate-50'
          >
            Cancelar
          </button>
          <button
            onClick={onDelete}
            className='px-8 py-2 w-36 rounded-md text-md text-white bg-red-500 hover:bg-red-600'
          >
            Excluir
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
