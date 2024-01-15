import { ReactNode, ReactElement } from 'react';

type PrimaryButtonProps = {
  children: ReactNode;
  icon?: ReactElement;
};

export const PrimaryButton = ({ children, icon }: PrimaryButtonProps) => {
  return (
    <button className='inline-flex gap-1 uppercase items-center px-4 py-2 text-xs font-medium rounded-full text-white bg-accent focus:ring'>
      {icon && <span className='icon'>{icon}</span>}
      {children}
    </button>
  );
};
