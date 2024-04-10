"use client";

import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();


const GlobalProvider = ({children}) => {

    const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider value={{unreadCount, setUnreadCount}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider


export const useGlobalContext = () => {
    return useContext(GlobalContext)
}