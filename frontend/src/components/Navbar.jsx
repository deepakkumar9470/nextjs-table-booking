import React from 'react'
import Image from 'next/image'

export const Navbar = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-10 flex justify-between items-center">
      <h1 className="text-2xl text-blue-800 font-bold dark:text-white">Table Booking App</h1>
      <Image src="/restaurant.png" width={50} height={50} alt="tablelogo"/>
    </div>
  </header>
  )
}
