"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { loginContext } from '../loginContext/MainContext'




export default function Header() {

    let { login, setLogin } = useContext(loginContext)
    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://www.wscubetech.com/images/wscube-tech-logo.svg" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://www.wscubetech.com/images/wscube-tech-logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ws CubeTech</span>
                    </a>

                    <div className="max-w-screen-xl px-4 py-3 mx-auto">
                        <div className="flex items-center">
                            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                                <li>
                                    <Link href={'/'}> <a href="#" className="hover:no-underline text-gray-900 dark:text-white " aria-current="page"> Home </a></Link>
                                </li>
                                <li>
                                    <Link href={'/about'}> <a href="#" className="hover:no-underline text-gray-900 dark:text-white  "> About </a> </Link>
                                </li>
                                <li>
                                    <Link href={'/course'}>  <a href="#" className="hover:no-underline text-gray-900 dark:text-white ">Course</a> </Link>
                                </li>
                                <li>
                                    <Link href={'/enquiry'}>  <a href="#" className="hover:no-underline text-gray-900 dark:text-white ">Enquiry</a> </Link>
                                </li>


                                <li>
                                    <Link href={'/enquiry-details'}>  <a href="#" className="hover:no-underline text-gray-900 dark:text-white ">Enquiry Details</a> </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <ul className='flex gap-4'>
                        {
                            login !== null ?
                                <>
                                    <li onClick={() => setLogin(null)} className='text-white cursor-pointer'>Logout</li>
                                </>
                                :
                                <>
                                    <li><Link href={'/signup'} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                                        Sign-Up
                                    </Link></li>
                                    <li> <Link href={'/sign-in'} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                                        Login
                                    </Link></li>
                                </>

                        }
                        </ul>
                        
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">

            </nav>
        </div>
    )
}
