"use client"
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { app } from '../FirebaseConfig';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { redirect } from 'next/navigation'
import { loginContext } from '../loginContext/MainContext';

export default function Login() {
    let { login, setLogin } = useContext(loginContext)
    const provider = new GoogleAuthProvider()

    useEffect(() => {
        if (login !== null) {
            redirect('/enquiry')
        }
    }, [login])

    const loginHandle = (event) => {
        event.preventDefault();
        let email = event.target.email.value;
        let password = event.target.password.value;

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                setLogin(user.accessToken)
                redirect('/')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const googleLogin = () => {
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                setLogin(token);
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            })
    }

    return (
        <div className='grid grid-cols-2 mt-10'>
            <div className=" flex col-span-2 justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-[500px] px-8">
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold ">Login</h1>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <button type='button' onClick={googleLogin} className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-opacity-75">Log in with Google</button>
                            <button type='button' onClick={googleLogin} className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-opacity-75">Log in with Facebook</button>
                        </div>
                        <div className="flex items-center justify-center mt-6 text-gray-500">
                            <hr className="w-full h-px bg-gray-300" />
                        </div>

                        <form onSubmit={loginHandle} className="mt-4 space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-2 text-sm font-medium">Your email</label>
                                <input type="email" id="email" name='email' className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full" placeholder="name@company.com" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="password" className="mb-2 text-sm font-medium">Your password</label>
                                <input type="password" name="password" id="password" className='px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full' />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="terms" name='terms' className="w-4 h-4 accent-blue-500 rounded-sm" />
                                <label htmlFor="terms" className="text-sm text-gray-700">By signing up, you agree to Wc CubeTech Terms of Use and Privacy Policy.</label>
                            </div>

                            <button type="submit" className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-opacity-75">Login</button>
                        </form>

                        <div className="flex items-center mt-6 text-sm text-gray-500">
                            <span>Dont have an account?</span>
                            <Link href="/signup" className="ml-2 text-blue-500 hover:underline">Sign Up here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
