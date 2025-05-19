import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <main className='flex-1 mt-16 mb-16'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout