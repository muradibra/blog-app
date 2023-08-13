import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../context/ThemeContext'

function BlogCard({ id, img_url, title, description }) {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={`blog-card mb-4  `} >
            <div className="img-wrapper">
                <img src={img_url} alt="Photo" />
            </div>
            <div className="content">
                <h1>{title}</h1>
                <p className={`ellipsis ${theme === "dark" ? "text-light" : ""} `}>{description}</p>
                <Link
                    to={`/blog/${id}`}
                    className='btn btn-outline-warning '
                >
                    Continue Reading
                </Link>
            </div>
        </div>
    )
}

export default BlogCard