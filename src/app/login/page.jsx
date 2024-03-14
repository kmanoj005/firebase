import Link from 'next/link'
import React from 'react'

export default function login() {
    return (
        <div>
            <div class="bg-gray-100 flex items-center justify-center h-screen">
                <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm">
                    <div class="flex flex-col items-center">
                        <h1 class="text-4xl font-bold mb-8">Welcome back</h1>

                        <div class="grid ">
                            <button class="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-opacity-75">Log in with Google</button>
                        </div>

                        <div class="flex items-center justify-center mt-6 text-gray-500">
                            <span class="mr-2">or</span>
                            <hr class="w-full h-px bg-gray-300" />
                        </div>

                        <form class="mt-4 space-y-4">
                            <div class="flex flex-col">
                                <label for="email" class="mb-2 text-sm font-medium">Email</label>
                                <input type="email" id="email" class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full" placeholder="name@company.com" />
                            </div>

                            <div class="flex flex-col">
                                <label for="password" class="mb-2 text-sm font-medium">Password</label>
                                <input type="password" id="password" class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full" />
                            </div>

                            <div class="flex items-center space-x-2">
                                <input type="checkbox" id="remember" class="w-4 h-4 accent-blue-500 rounded-sm" />
                                <label for="remember" class="text-sm text-gray-700">Remember me</label>
                            </div>

                            <button type="submit" class="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-opacity-75">Sign in to your account</button>
                        </form>

                        <div class="flex items-center mt-6 text-sm text-gray-500">
                            <span>Don't have an account yet?</span>
                            <Link href={'/register'} class="ml-2 text-blue-500 hover:underline"> Sign up here</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
