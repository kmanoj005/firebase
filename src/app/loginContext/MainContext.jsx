"use client"
import React, { createContext, useState } from 'react'

export let loginContext = createContext();

export default function MainContext({children}) {

  let [login, setLogin] = useState(null)
  let loginDetails = {login, setLogin}

  return (
    <loginContext.Provider value={loginDetails}>
        {children}
    </loginContext.Provider>
  )
}
 