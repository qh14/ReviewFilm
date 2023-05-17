import React from 'react'
import Navbar from '../user/Navbar'


export const DefaultLayout = ({children}) => {
  return (
    <>
    <Navbar />
    {children}  
    </>
       
  )
}
