import React from 'react';
import logo from '../../assets/svg/logo.svg';
import settings from '../../assets/svg/settings.svg';
import profile from '../../assets/svg/profile.svg';
import noti from '../../assets/svg/noti.svg';
const Navbar = () => {
  return (
    <nav className='bg-white px-2 border-b-2'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <div className='flex flex-wrap'>
          <a href='#' className='flex items-center'>
            <img src={logo} className='mr-3 h-6' alt='Logo' />
          </a>
          <a href='#' className='flex items-center p-2.5 border-b-2 border-white hover:border-blue-500 hover:bg-blue-100'>
            <span className='uppercase'>dashboard</span>
          </a>
          <a href='#' className='flex items-center p-2.5 border-b-2 border-blue-500 bg-blue-100'>
            <span className='uppercase'>alerts</span>
          </a>
        </div>
        <div className='flex flex-wrap'>
          <div className='flex flex-wrap border-r-2 border-gray-400'>
            <a href='#' className='flex items-center px-1 hover:opacity-50'>
              <img src={settings} className='mr-3 h-4.5' alt='settings' />
            </a>
            <a href='#' className='flex items-center px-1 hover:opacity-50'>
              <img src={profile} className='mr-3 h-4.5' alt='profile' />
            </a>
            <a href='#' className='flex items-center px-1 hover:opacity-50'>
              <img src={noti} className='mr-3 h-4.5' alt='noti' />
            </a>
          </div>
          <a href='#' className='px-2 hover:opacity-50'>
            <span className='text-gray-500'>Welcome Admin!</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;