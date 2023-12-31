'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Navbar = () => {
    const [userlogin, setUserlogin] = useState(false)
    useEffect(() => {
        try {
            if (JSON.parse(localStorage.getItem("userdata"))._id) {
                setUserlogin(true)
            }
        } catch (error) {
        }
    }, [userlogin])
    return (
        <header className="text-gray-400 bg-gray-900 body-font sticky top-0 left-0 right-0">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href={"/"} className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <Image src={"/kmcsc-logo.jpg"} alt='KMCSC LOGO' height={40} width={40} className='rounded-full' />
                    <span className="ml-3 text-xl">KMCSC</span>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <input type="text" placeholder='Search' id="search" name="search" className="hidden mx-6 w-[250px] bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <Link href={"/"} className="mr-5 hover:text-white">Home</Link>
                    <Link href={"/posts"} className="mr-5 hover:text-white">Posts</Link>
                    <Link href={"/about"} className="mr-5 hover:text-white">About</Link>
                    {userlogin ? <Link href={"/dashboard/home"} className="mr-5 hover:text-white">Dashboard</Link> : <Link href={"/login"} className="mr-5 hover:text-white">Login</Link>}
                    {userlogin && <button className="mr-5 hover:text-white" onClick={() => { localStorage.clear(); window.location.reload() }}>Logout</button>}
                </nav>
            </div>
        </header>
    )
}

export default Navbar