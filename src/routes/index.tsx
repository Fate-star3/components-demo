import React from 'react'
import {Routes,Route ,Navigate} from 'react-router-dom'
import Home from '@/pages/Home'

const RoutesConfig = () => {
  return (
   <Routes>
    <Route path='/' element={<Home/> }/>
    <Route path="/home" element={<Navigate to='/' replace />}></Route>
   </Routes>
  )
}

export default RoutesConfig