import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '@/pages/Home'

const Mine = lazy(() => import('@/pages/Mine'))
const Test = lazy(() => import('@/pages/Test'))
const Demo = lazy(() => import('@/pages/Demo'))

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Navigate to='/' replace />} />
      <Route path='/mine' element={<Mine />} />
      <Route path='/test' element={<Test />} />
      <Route path='/demo' element={<Demo />} />
    </Routes>
  )
}

export default RoutesConfig
