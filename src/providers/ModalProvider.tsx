// providers/ModalProvider.tsx
import { createContext, useContext, useState } from 'react';
import { useApiData } from './ApiDataProvider';

type Props = { children: React.ReactNode };

type ModalContextType = {
  isModalOpen: boolean;
  openModal: (postId: number) => void;
  closeModal: () => void;
  deletePost: () => Promise<void>;
};

const defaultModalContext: ModalContextType = {
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  deletePost: async () => {},
};

const ModalContext = createContext<ModalContextType>(defaultModalContext);

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const { deletePost: deletePostApi } = useApiData();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  const openModal = (postId: number) => {
    setCurrentPostId(postId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const deletePost = async () => {
    if (currentPostId) {
      await deletePostApi(currentPostId);
      console.log('Deleting post with ID:', currentPostId);
      closeModal();
    }
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, deletePost }}
    >
      {children}
    </ModalContext.Provider>
  );
};
