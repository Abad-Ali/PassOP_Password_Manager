import React from 'react'

const Navbar = () => {
  return (
    
      <nav className='bg-gray-950 flex justify-between items-center p-1 h-12 text-white '>
        <div className='logo font-bold text-xl md:text-3xl  md:ml-7'>
            <span className='text-blue-700'>&lt;</span>
            Pass
            <span className='text-blue-700'>Op/&gt;</span>
        </div>
        <ul>
            <li className='flex md:gap-5 md:mr-22  md:ml-0 text-xs md:text-base'>
              <a className='hover:text-blue-700 text-2xs md:text-xl ' href='/'>Home</a>
              <a className='hover:text-blue-700 text-2xs md:text-xl ml-2' href='https://github.com/Abad-Ali/PassOP_Password_Manager/blob/main/README.md'>About</a>
              <a className='hover:text-blue-700 text-2xs md:text-xl ml-2 md:mr-7' href='https://github.com/Abad-Ali'>Contact</a>
            </li>
        </ul>

        <a href="https://github.com/Abad-Ali" target="_blank" rel="noopener noreferrer">
          <button className=''>
            <img className='invert w-6 md:w-10 md:p-1 md:ml-0 mr-2' src='/icons/github.svg' alt='GitHub' />
          </button>
        </a>

        
      </nav>
  )
}

export default Navbar
