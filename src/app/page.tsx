'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HomePage() {
  const router = useRouter();
  return (
    <div>
      <h1>Homepage</h1>
      <div>
        <button onClick={() => router.push('/register')} className='bg-pink m-3 p-3 rounded-lg text-white hover:opacity-70'>Resgistrate</button>
        <button onClick={() => router.push('/login')} className='bg-pink m-3 p-3 rounded-lg text-white hover:opacity-70'>Ingresa</button>
      </div>
    </div>
  )
}
