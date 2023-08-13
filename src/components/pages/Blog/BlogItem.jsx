import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { apiUrl } from '../../../Config'
import { Link, useParams } from 'react-router-dom'
import { Alert, Container } from 'reactstrap'

import Logo from '/src/assets/images/logo.png'
import { LoaderContext } from '../../../context/LoaderContext'
import Loader from '../../Lib/Loader/Loader'
import { errorMessages } from '../../../utils/renderErrorMessages'


function BlogItem() {
    const { id } = useParams()
    const [blogData, setBlogData] = useState(null)
    const { isLoading, setIsLoading } = useContext(LoaderContext)

    useEffect(() => {
        getBlogData()
    }, [])

    const getBlogData = () => {
        setIsLoading(true)
        axios.get(`${apiUrl}/blogs/${id}`).then(res => {
            setBlogData(res.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (blogData?.user_id) {
            axios.get(`${apiUrl}/users/${blogData?.user_id}`).then(res => {
                setBlogData({ ...blogData, author_name: res.data.fullname })
            })
        }
    }, [blogData?.id])

    return (
        <div>
            <Container>
                {
                    isLoading ? <Loader /> :
                        !blogData ?
                            <div className="my-4">
                                <Alert color='danger'>
                                    {errorMessages.notFound(`Blog with id: ${id}`)}
                                </Alert>
                                <Link
                                    to="/"
                                    className='my-4'
                                >
                                    Go to home page
                                </Link>
                            </div> :
                            <div>
                                <header className='py-3'>
                                    <div className="logo-wrapper">
                                        <img src={Logo} alt="" />
                                    </div>
                                </header>
                                <div className='blog-item my-4'>
                                    <div className='img-wrapper d-flex justify-content-center'>
                                        <img src={blogData?.img_url} alt="Photo" />
                                    </div>
                                    <div className='text-wrapper py-3'>
                                        <div className='title'>
                                            <h1 className='fw-bold'>
                                                {blogData?.title}
                                            </h1>
                                        </div>
                                        <p>{blogData.author_name}</p>
                                        <div className='description'>
                                            <p>
                                                {blogData?.description}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                }
            </Container>
        </div>
    )
}

export default BlogItem