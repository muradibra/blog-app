import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import BlogItem from './components/pages/Blog/BlogItem'
import BlogCreate from './components/pages/Admin/BlogCreate'
import { ToastContainer } from 'react-toastify'

import "./assets/css/style.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<BlogItem />} />
        <Route path='/admin' element={<BlogCreate />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App