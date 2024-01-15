import logoImage from '../../assets/logo-psicomanager.png';

function Navbar() {
  return (
    <nav className='bg-white shadow-md fixed w-full z-10 top-0 left-0'>
      <div className='flex justify-center items-center h-16'>
        <a href='/' aria-label='Voltar para a Home'>
          <img src={logoImage} alt='Logo' role='img' className='h-10 w-auto' />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
