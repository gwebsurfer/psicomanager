export const LoadingSpinner = () => (
  <div className='flex justify-center items-center h-screen'>
    <div className='relative flex justify-center items-center rounded-full h-12 w-12'>
      <div className='animate-spin rounded-full border-t-1 border-b-2 border-primary h-full w-full'></div>
    </div>
  </div>
);
