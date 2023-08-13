import React, { useContext } from 'react'
import Header from '../../layout/Header/Header'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { apiUrl } from '../../../Config'
import { Container, Row, Spinner } from 'reactstrap'
import BlogCard from '../../Lib/Blog/BlogCard'
import { LoaderContext } from '../../../context/LoaderContext'
import Loader from '../../Lib/Loader/Loader'

function Home() {
    const [list, setList] = useState([])
    const { isLoading, setIsLoading } = useContext(LoaderContext)

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        setIsLoading(true)
        axios.get(`${apiUrl}/blogs`).then(res => {
            if (res.status === 200) {
                setList(res.data)
                setIsLoading(false)
            }
        })
    }

    return (
        <div>
            <Header />
            <div className='home py-4'>
                {
                    !isLoading ?
                        <Container>
                            <Row>
                                {
                                    list.map(item => (
                                        <div
                                            key={item.id}
                                            className='col-md-12'
                                        >
                                            <BlogCard {...item} />
                                        </div>
                                    ))
                                }
                            </Row>
                        </Container>
                        :
                        <Loader />

                }
            </div>
        </div>
    )
}

export default Home