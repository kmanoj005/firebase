
"use client"
import Link from 'next/link'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React from 'react'
import { app } from '../FirebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function login() {
    const auth = getAuth(app);

    let handleRegistration = (event) => {

        let email = event.target.email.value;
        let password = event.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user)
                toast.success("Profile created Successfully");
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
                if (errorCode === "auth/email-already-in-use") {
                    toast.error('Email is already in use ');
                }
                const errorMessage = error.message;
                if (errorCode === "auth/weak-password") {
                    toast.error("password weak");
                }
            });

        event.preventDefault()
        event.target.reset();
    }

    return (
        <div>
             <ToastContainer />
            <div class="bg-gray-100 flex items-center justify-center pt-12 ">
                <div class="bg-white p-8 mb-28 rounded-lg shadow-lg max-w-sm">
                    <div class="flex flex-col items-center">
                        <h1 class="text-4xl font-bold mb-8">Sign Up Form</h1>

                        <div class="grid ">
                            <button class="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-opacity-75">Sign up with Google</button>
                        </div>

                        <div class="flex items-center justify-center mt-6 text-gray-500">
                            <span class="mr-2">or</span>
                            <hr class="w-full h-px bg-gray-300" />
                        </div>

                        <form class="mt-4 space-y-4" onSubmit={handleRegistration}>
                            <div class="flex flex-col">
                                <label for="email" name="email" class="mb-2 text-sm font-medium">Email</label>
                                <input type="email" id="email" class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full" placeholder="name@company.com" />
                            </div>

                            <div class="flex flex-col">
                                <label for="password" name="password" class="mb-2 text-sm font-medium">Password</label>
                                <input type="password" id="password" class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full" />
                            </div>

                            <div class="flex items-center space-x-2">
                                <input type="checkbox" id="remember" class="w-4 h-4 accent-blue-500 rounded-sm" />
                                <label for="remember" class="text-sm text-gray-700">Remember me</label>
                            </div>

                            <button type="submit" class="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-opacity-75">Sign Up Now</button>
                        </form>

                        <div class="flex items-center mt-6 text-sm text-gray-500">
                            <span>Already have an account</span>
                            <Link href={'/sign-in'} class="ml-2 text-blue-500 hover:underline"> Sign in here</Link>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
