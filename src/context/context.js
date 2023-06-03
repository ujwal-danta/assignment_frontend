import React, { createContext, useState } from 'react'

export const userDataContext = createContext(null)

const Context = ({children}) => {
    const [userData,setUserData] = useState(null)
  return (
    <userDataContext.Provider value={{userData,setUserData}}>
        {children}
    </userDataContext.Provider>
  )
}

export default Context