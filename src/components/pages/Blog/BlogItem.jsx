import axios from 'axios'
import { useState, useEffect } from 'react'
import { apiUrl } from '../../../Config'
import { useParams } from 'react-router-dom'
import { Container } from 'reactstrap'

import Logo from '/src/assets/images/logo.png'


function BlogItem() {
    const { id } = useParams()
    const [blogItem, setBlogItem] = useState({})
    useEffect(() => {
        axios.get(`${apiUrl}/blogs/${id}`)
            .then(res => setBlogItem(res.data))
    }, [])
    const { img_url, title, description } = blogItem

    return (
        <Container>
            <header className='py-3'>
                <div className="logo-wrapper "
                    style={{
                        marginLeft: "206px"
                    }}
                >
                    <img src={Logo} alt="" />
                </div>
            </header>
            <div className='blog-item my-4'>
                <div className='img-wrapper d-flex justify-content-center' >
                    <img
                        src={img_url}
                        alt="Photo"
                        style={{
                            width: '880px',
                            height: '400px'
                        }}
                    />
                </div>
                <div className='text-wrapper'
                    style={{
                        margin: "0 245px",
                        padding: "40px 0"
                    }}
                >
                    <div className='title'>
                        <h1 className='fw-bold'>
                            {title}
                        </h1>
                    </div>
                    <div className='description'>
                        <p>
                            {description}
                        </p>
                    </div>

                </div>
            </div>
        </Container>
    )
}

export default BlogItem