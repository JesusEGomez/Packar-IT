import React from 'react';
import loader from '../../public/Spinner-1s-200px.gif';
import Image from 'next/image';
function loading() {
  return (
    <div className='flex w-screen justify-center items-center h-screen justify-items-center'>
      <Image src={loader} alt='loader' height='200' width='200'  />
    </div>
  )
}

export default loading
