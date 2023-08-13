import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import BlogItem from './components/pages/Blog/BlogItem'
import BlogCreate from './components/pages/Admin/BlogCreate'
import { ToastContainer } from 'react-toastify'

import "./assets/css/style.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from './context/ThemeContext'
import { LoaderContext } from './context/LoaderContext'

function App() {
  const [theme, setTheme] = useState(localStorage.theme)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
      localStorage.setItem("theme", "light")
      document.body.classList.remove("dark")
    } else {
      setTheme("dark")
      localStorage.setItem("theme", "dark")
      document.body.classList.add("dark")
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LoaderContext.Provider value={{isLoading, setIsLoading}}>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog/:id' element={<BlogItem />} />
            <Route path='/admin' element={<BlogCreate />} />
          </Routes>
          <ToastContainer />
        </div>
      </LoaderContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App