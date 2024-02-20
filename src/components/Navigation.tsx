import { Icon } from '@iconify/react';
import ButtonConnect from '@components/ButtonConnect';
import logoImg from '@assets/ator-logo-full.png';
import logoImgSm from '@assets/ator-logo.png';
import { useState } from 'react';

const Navigation = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const nav = [
    {
      name: 'Website',
      href: 'https://www.ator.io/',
    },
    {
      name: 'Press',
      href: 'https://medium.com/@atorprotocol',
    },
    {
      name: 'Learn',
      href: 'https://docs.ator.io/',
    },
    {
      name: 'More info',
      href: 'https://www.ator.io/buy-hardware',
    },
  ];

  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <nav
        className='flex items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <a href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>ATOR</span>
            <img
              src={logoImg}
              alt='Ator logo'
              className='sm:h-18 w-auto h-12'
            />
          </a>
        </div>
        <div className='lg:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuIsOpen(true)}
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
          >
            <span className='sr-only'>Open main menu</span>
            <Icon icon='eva:menu-outline' className='h-6 w-6' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {nav.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-white'
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <ButtonConnect />
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu open state. */}
      <div
        role='dialog'
        aria-modal='true'
        className={`lg:hidden ${mobileMenuIsOpen ? 'block' : 'hidden'} `}
      >
        {/* Background backdrop, show/hide based on slide-over state. */}
        <div className='fixed inset-0 z-50'></div>
        <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
          <div className='flex items-center justify-between'>
            <a href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>ATOR</span>
              <img
                src={logoImgSm}
                alt='Ator logo'
                className='sm:h-18 w-auto h-12'
              />
            </a>
            <button
              type='button'
              onClick={() => setMobileMenuIsOpen(false)}
              className='-m-2.5 rounded-md p-2.5 text-gray-400'
            >
              <span className='sr-only'>Close menu</span>
              <Icon icon='eva:close-outline' className='h-6 w-6' />
            </button>
          </div>

          <div className='flex flex-col items-center justify-center mt-16 gap-4'>
            <ButtonConnect />
            <div className='w-full bg-gradient-to-r from-gray-600/10 via-cyan-600 to-gray-600/10 h-px my-4'></div>
            {nav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-sm font-semibold leading-6 text-cyan-300 font-brand tracking-wider'
              >
                {item.name}
              </a>
            ))}
            <div className='w-full bg-gradient-to-r from-gray-600/10 via-cyan-600 to-gray-600/10 h-px my-4'></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
