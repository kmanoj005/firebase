"use client";

import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import Link from 'next/link';
import { app } from '../FirebaseConfig';
import generateUniqueId from 'generate-unique-id';


export default function Register() {
    const db = getDatabase(app);
    const [users, setUsers] = useState([]);

    const saveData = (event) => {
       

        const uId = generateUniqueId();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const password = event.target.password.value;

        try {
            set(ref(db, 'users/' + uId), {
                name,
                email,
                phone,
                password
            });
        }
        catch {
            console.log("Error");
        }

        getUserData();
        event.target.reset();
        event.preventDefault();
    };

    const getUserData = () => {
        const userListData = [];
        const userData = ref(db, 'users/');
        onValue(userData, (enValue) => {
            const data = enValue.val();

            for (let key in data) {
                let obj = data[key];
                obj['key'] = key;
                userListData.push(obj);
            }
            setUsers(userListData);
        });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <div className='grid grid-cols-2 gap-4'>
                <div className="bg-gray-100 flex items-center justify-center h-screen">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-[500px] px-8">
                        <div className="flex flex-col items-center">
                            <h1 className="text-4xl font-bold mb-8">Registration Form</h1>

                            <div className=" ">
                                <button className="flex items-center justify-center px-4  bg-gray-800 text-white rounded-lg shadow-md hover:bg-opacity-75">Sign up with Google</button>
                            </div>

                            <div className="flex items-center justify-center mt-6 text-gray-500">
                                <span className="mr-2">or</span>
                                <hr className="w-full h-px bg-gray-300" />
                            </div>

                            <form onSubmit={saveData} className="mt-4 space-y-4">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="mb-2 text-sm font-medium">Your Name</label>
                                    <input type="text" id="name" name='name' className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full" placeholder="e.g. Bonnie Green" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="email" className="mb-2 text-sm font-medium">Your email</label>
                                    <input type="email" id="email" name='email' className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full" placeholder="name@company.com" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="phone" className="mb-2 text-sm font-medium">Your phone </label>
                                    <input type="tel" id="phone" name='phone' className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full" placeholder="123-456-7890" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="password" className="mb-2 text-sm font-medium">Your password</label>
                                    <input type="password" id="password" name='password' className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full" />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="terms" name='terms' className="w-4 h-4 accent-blue-500 rounded-sm" />
                                    <label htmlFor="terms" className="text-sm text-gray-700">By signing up, you agree to Wc CubeTech Terms of Use and Privacy Policy.</label>
                                </div>

                                <button type="submit" className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-opacity-75">Create an account</button>
                            </form>

                            <div className="flex items-center mt-6 text-sm text-gray-500">
                                <span>Already have an account?</span>
                                <Link href="/login" className="ml-2 text-blue-500 hover:underline">Login here</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-gray-100 mt-[80px] items-center justify-center'>
                    <table className='w-full text-sm text-left rtl:text-right px-[50px]'>
                        <thead className='text-md text-center uppercase bg-gray-50 dark:text-gray-800'>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ?
                                users.map((item, index) => (
                                    <tr key={index}>
                                        <td className=' pb-3 '>{item.key}</td>
                                        <td className=' pb-3 '>{item.name}</td>
                                        <td className=' pb-3 '>{item.email}</td>
                                        <td className=' pb-3 '>{item.phone}</td>
                                    </tr>
                                )) :
                                <tr>
                                    <td colSpan="4">No data</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
