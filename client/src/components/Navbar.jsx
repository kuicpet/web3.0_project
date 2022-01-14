import React, { useState } from 'react'
import { HiOutlineMenuAlt4, HiOutlineX } from 'react-icons/hi'

import logo from '../../images/web3.png'

const NavbarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
}
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img src={logo} alt='logo' className='w-32 cursor-pointer' />
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
          <NavbarItem key={item + index} title={item} />
        ))}
        <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
          Login
        </li>
      </ul>
      <div className='flex relative'>
        {toggleMenu ? (
          <HiOutlineX
            fontSize={28}
            className='text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiOutlineMenuAlt4
            fontSize={28}
            className='text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(true)}
          />
        )}
        {/**Mobile Menu */}
        {toggleMenu && (
          <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in bg-black'>
            <li className='text-xl w-full my-2'>
              <HiOutlineX
                className='cursor-pointer'
                onClick={() => setToggleMenu(false)}
              />
            </li>
            {['Market', 'Exchange', 'Tutorials', 'Wallets'].map(
              (item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps='my-2 text-lg'
                />
              )
            )}
            <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
              Login
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
