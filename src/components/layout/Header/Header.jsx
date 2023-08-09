import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

function Header() {
    return (
        <div className='py-4'>
            <Container>
                <Link
                    to='/admin'
                    className='btn btn-primary'
                >
                    Blog Əlavə
                </Link>
            </Container>
        </div>
    )
}

export default Header