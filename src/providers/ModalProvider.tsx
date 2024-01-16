import { createContext, useContext, useState } from 'react';
import { useApiData } from './ApiDataProvider';

type Props = { children: React.ReactNode };

type ModalContextType = {
  isModalOpen: boolean;
  modalType: string | null;
  openModal: (type: string, postId?: number) => void;
  closeModal: () => void;
  deletePost: () => Promise<void>;
};

const defaultModalContext: ModalContextType = {
  isModalOpen: false,
  modalType: null,
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
  const [modalType, setModalType] = useState<string | null>(null);

  const openModal = (type: string, postId?: number | null) => {
    setCurrentPostId(postId || null);
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  const deletePost = async () => {
    if (currentPostId) {
      await deletePostApi(currentPostId);
      closeModal();
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalType,
        openModal,
        closeModal,
        deletePost,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
