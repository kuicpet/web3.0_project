import React from 'react'
import logo from '../../images/web3.png'
const Footer = () => {
  return (
    <footer className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
      <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
        <div className='flex flex-[0.5] justify-center items-center'>
          <img src={logo} alt='logo' className='w-32' />
        </div>
        <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>
            Markets
          </p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>
            Exchanges
          </p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>
            Tutorials
          </p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>
            Wallets
          </p>
        </div>
      </div>
      <div className='flex justify-center items-center flex-col mt-5'>
        <p className='text-white text-sm text-center'>Come join us</p>
        <p className='text-white text-sm text-center'>info@krypt.com</p>
      </div>
      <div className='w-full sm:w-[90%] h-[0.25px] bg-gray-400 mt-5' />
      <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
        <p className='text-white text-sm text-center'>&copy;krypt {new Date().getFullYear()}</p>
        <p className='text-white text-sm text-center'>All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
