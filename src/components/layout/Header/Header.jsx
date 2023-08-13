import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Row } from 'reactstrap'
import { ThemeContext } from '../../../context/ThemeContext'

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <div className='py-4'>
            <Container>
                <Row>
                    <div className="col-md-6">
                        <Link
                            to='/admin'
                            className='btn btn-primary mb-4'
                        >
                            Blog Əlavə et
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Button
                            color={
                                theme === "dark" ?
                                    "light" : "secondary"
                            }
                            className='mb-4'
                            onClick={() => toggleTheme()}
                        >
                            Change Theme
                        </Button>
                    </div>
                </Row>

            </Container>
        </div>
    )
}

export default Header