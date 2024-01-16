import { ReactNode, ReactElement, MouseEvent } from 'react';

type PrimaryButtonProps = {
  children: ReactNode;
  icon?: ReactElement;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const PrimaryButton = ({
  children,
  icon,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <button
      className='inline-flex gap-1 uppercase items-center px-4 py-2 text-xs font-medium rounded-full text-white bg-accent focus:ring'
      onClick={onClick}
    >
      {icon && <span className='icon'>{icon}</span>}
      {children}
    </button>
  );
};
