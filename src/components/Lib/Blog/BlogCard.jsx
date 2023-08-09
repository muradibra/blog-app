import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { apiUrl } from '../../../Config'

function BlogCard({ id, img_url, title, description }) {
    // const params = useParams()
    // console.log(params);
    // const [blogData, setBlogData] = useState({})

    // useEffect(() => {
    //     axios.get(`${apiUrl}/blogs/${id}`)
    //     .then(res => {
    //         if(res.status === 200) {
    //             setBlogData(res.data)
    //         }
    //     })
    // }, [id])

    return (
        <div className='blog-card mb-4'>
            <div className="img-wrapper">
                <img src={img_url} alt="Photo" />
            </div>
            <div className="content">
                <h1>{title}</h1>
                <p>{description}</p>
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