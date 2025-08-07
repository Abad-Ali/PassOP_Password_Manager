import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-950 text-gray-500 p-8'>
      <div className='flex justify-center text-xs md:text-base'>Thanks for visiting! | Customer Support: [<a className="hover:text-blue-700" href="https://github.com/Abad-Ali">GitHub</a>]] </div>
      <div className='flex justify-center'>
          <div >© 2023
                <span className='text-blue-700'> &lt;</span>
                 <span className='flexlogo font-bold text-white'>Pass</span>
                <span className='text-blue-700'>Op/&gt; </span>
                . All Rights Reserved. | Privacy Policy | Terms of Service</div>
            </div>
    </div>
  )
}

export default Footer
