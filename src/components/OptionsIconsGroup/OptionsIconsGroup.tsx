import { useModal } from '../../providers/ModalProvider';
import { ModalTypes } from '../../typings/modalTypes';
import { Tooltip } from '../Tooltip/Tooltip';

type OptionsIconsGroupProps = {
  postId: number;
};

export const OptionsIconsGroup = ({ postId }: OptionsIconsGroupProps) => {
  const { openModal } = useModal();
  return (
    <div className='grid grid-cols-3 gap-0 sm:gap-4 sm:mx-auto justify-center items-center'>
      <button disabled aria-label='Editar' className='mx-auto'>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.1391 1.93819C11.5267 1.55093 12.0521 1.33337 12.6 1.33337C13.1481 1.33337 13.6738 1.55112 14.0614 1.93871C14.449 2.3263 14.6667 2.85198 14.6667 3.40011C14.6667 3.94809 14.4491 4.47363 14.0617 4.86119C14.0616 4.8613 14.0618 4.86108 14.0617 4.86119L13.219 5.70697C13.1956 5.74145 13.1686 5.77423 13.1381 5.80478C13.1081 5.83474 13.076 5.86126 13.0422 5.88432L8.47225 10.4707C8.34715 10.5962 8.17722 10.6668 8 10.6668H6C5.63181 10.6668 5.33333 10.3683 5.33333 10.0001V8.00011C5.33333 7.82289 5.4039 7.65296 5.52944 7.52787L10.1154 2.95824C10.1385 2.92432 10.1652 2.89207 10.1953 2.86197C10.2259 2.83129 10.2589 2.80422 10.2935 2.78077L11.1386 1.93871C11.1388 1.93854 11.1389 1.93836 11.1391 1.93819ZM10.6742 4.28371L6.66667 8.27695V9.33345H7.72316L11.7164 5.32592L10.6742 4.28371ZM12.6575 4.38142L11.6187 3.34259L12.0814 2.88152C12.2189 2.74398 12.4055 2.66671 12.6 2.66671C12.7945 2.66671 12.9811 2.74398 13.1186 2.88152C13.2561 3.01906 13.3334 3.2056 13.3334 3.40011C13.3334 3.59462 13.2561 3.78117 13.1186 3.91871L12.6575 4.38142ZM2.58579 4.58583C2.96086 4.21075 3.46957 4.00004 4 4.00004H4.66667C5.03486 4.00004 5.33333 4.29852 5.33333 4.66671C5.33333 5.0349 5.03486 5.33337 4.66667 5.33337H4C3.82319 5.33337 3.65362 5.40361 3.5286 5.52864C3.40357 5.65366 3.33333 5.82323 3.33333 6.00004V12C3.33333 12.1769 3.40357 12.3464 3.5286 12.4714C3.65362 12.5965 3.82319 12.6667 4 12.6667H10C10.1768 12.6667 10.3464 12.5965 10.4714 12.4714C10.5964 12.3464 10.6667 12.1769 10.6667 12V11.3334C10.6667 10.9652 10.9651 10.6667 11.3333 10.6667C11.7015 10.6667 12 10.9652 12 11.3334V12C12 12.5305 11.7893 13.0392 11.4142 13.4143C11.0391 13.7893 10.5304 14 10 14H4C3.46957 14 2.96086 13.7893 2.58579 13.4143C2.21071 13.0392 2 12.5305 2 12V6.00004C2 5.46961 2.21071 4.9609 2.58579 4.58583Z'
            fill='#6D768B'
          />
        </svg>
      </button>
      <button disabled aria-label='Duplicar' className='mx-auto'>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H9.33333C9.86377 2 10.3725 2.21071 10.7475 2.58579C11.1226 2.96086 11.3333 3.46957 11.3333 4V4.66667H12C13.1046 4.66667 14 5.5621 14 6.66667V12C14 13.1046 13.1046 14 12 14H6.66667C5.5621 14 4.66667 13.1046 4.66667 12V11.3333H4C3.46957 11.3333 2.96086 11.1226 2.58579 10.7475C2.21071 10.3725 2 9.86377 2 9.33333V4C2 3.46957 2.21071 2.96086 2.58579 2.58579ZM6 12C6 12.3682 6.29848 12.6667 6.66667 12.6667H12C12.3682 12.6667 12.6667 12.3682 12.6667 12V6.66667C12.6667 6.29848 12.3682 6 12 6H6.66667C6.29848 6 6 6.29848 6 6.66667V12ZM10 4.66667H6.66667C5.5621 4.66667 4.66667 5.5621 4.66667 6.66667V10H4C3.82319 10 3.65362 9.92976 3.5286 9.80474C3.40357 9.67971 3.33333 9.51014 3.33333 9.33333V4C3.33333 3.82319 3.40357 3.65362 3.5286 3.5286C3.65362 3.40357 3.82319 3.33333 4 3.33333H9.33333C9.51014 3.33333 9.67971 3.40357 9.80474 3.5286C9.92976 3.65362 10 3.82319 10 4V4.66667Z'
            fill='#6D768B'
          />
        </svg>
      </button>
      <Tooltip text='Excluir'>
        <button
          aria-label='Excluir'
          onClick={() => openModal(ModalTypes.POST_DELETE, postId)}
          className='mx-auto'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5.72386 1.7239C5.97391 1.47385 6.31304 1.33337 6.66667 1.33337H9.33333C9.68696 1.33337 10.0261 1.47385 10.2761 1.7239C10.5262 1.97395 10.6667 2.31309 10.6667 2.66671V4.00004H12.6589C12.6636 3.99999 12.6683 3.99999 12.673 4.00004H13.3333C13.7015 4.00004 14 4.29852 14 4.66671C14 5.0349 13.7015 5.33337 13.3333 5.33337H13.2801L12.6664 12.6972C12.6585 13.2166 12.4488 13.713 12.0809 14.0809C11.7058 14.456 11.1971 14.6667 10.6667 14.6667H5.33333C4.8029 14.6667 4.29419 14.456 3.91912 14.0809C3.55125 13.713 3.34148 13.2166 3.33357 12.6972L2.71991 5.33337H2.66667C2.29848 5.33337 2 5.0349 2 4.66671C2 4.29852 2.29848 4.00004 2.66667 4.00004H3.32702C3.33174 3.99999 3.33644 3.99999 3.34113 4.00004H5.33333V2.66671C5.33333 2.31309 5.47381 1.97395 5.72386 1.7239ZM4.05787 5.33337L4.66436 12.6113C4.6659 12.6298 4.66667 12.6482 4.66667 12.6667C4.66667 12.8435 4.7369 13.0131 4.86193 13.1381C4.98695 13.2631 5.15652 13.3334 5.33333 13.3334H10.6667C10.8435 13.3334 11.013 13.2631 11.1381 13.1381C11.2631 13.0131 11.3333 12.8435 11.3333 12.6667C11.3333 12.6482 11.3341 12.6298 11.3356 12.6113L11.9421 5.33337H4.05787ZM9.33333 4.00004H6.66667V2.66671H9.33333V4.00004ZM6.66667 6.66671C7.03486 6.66671 7.33333 6.96518 7.33333 7.33337V11.3334C7.33333 11.7016 7.03486 12 6.66667 12C6.29848 12 6 11.7016 6 11.3334V7.33337C6 6.96518 6.29848 6.66671 6.66667 6.66671ZM9.33333 6.66671C9.70152 6.66671 10 6.96518 10 7.33337V11.3334C10 11.7016 9.70152 12 9.33333 12C8.96514 12 8.66667 11.7016 8.66667 11.3334V7.33337C8.66667 6.96518 8.96514 6.66671 9.33333 6.66671Z'
              fill='#2797BA'
            />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};