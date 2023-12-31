'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const NavBar = () => {
  const router = useRouter()
  return (
    <div className="bg-black w-full h-16 flex gap-12 items-center px-24">
      <h1 onClick={() => router.push('/')} className="text-white font-bold text-3xl">Cricket match</h1>
      <h1 onClick={() => router.push('/matches')} className="text-white font-semibold text-xl">See matches</h1>
    </div>
  )
}

export default NavBar
