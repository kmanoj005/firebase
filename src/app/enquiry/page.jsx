"use client";
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import Link from 'next/link';
import { app } from '../FirebaseConfig';
import generateUniqueId from 'generate-unique-id';
import { useRouter } from 'next/navigation'


export default function Enquiry() {
    const router = useRouter();
    const db = getDatabase(app);
    const [users, setUsers] = useState([]);

    const saveData = (event) => {
        const uId = generateUniqueId();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const message = event.target.message.value;

        try {
            set(ref(db, 'enquiry/' + uId), {
                name,
                email,
                phone,
                message
            });
        }
        catch {
            console.log("Error");
        }

        getUserData();
        event.target.reset();
        event.preventDefault();
    };

   

    return (
        <>
            <div className='grid grid-cols-2 '>
                <div className="bg-gray-100 flex col-span-2 justify-center h-screen">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-[500px] px-8">
                        <div className="flex flex-col items-center">
                            <h1 className="text-4xl font-bold ">Enquiry Form</h1>

                            <div className="flex items-center justify-center mt-6 text-gray-500">
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
                                    <label htmlFor="message" className="mb-2 text-sm font-medium">Your message</label>
                                    <textarea name="message" id="message" cols="30" rows="4" placeholder='Type your message' className='px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full'></textarea>
                                    {/* <input type="" id="message" name='message' className="" /> */}
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
            </div>
        </>
    );
}
