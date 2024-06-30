import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { LoginContext } from './contextProvider/ContextProvider';
import { useContext } from 'react';

function Header() {

    const { loginAuthentication } = useContext(LoginContext);

    // console.log("Header in component");

    return (
        <Navbar expand="lg" className="shadow-sm position-sticky top-0">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" className="text-black text-decoration-none fw-bold">NavBar</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link>

                            <Avatar className='bg-primary'>
                                {
                                    loginAuthentication ? loginAuthentication.user.name[0] : <PersonIcon />
                                }

                            </Avatar>
                        </Nav.Link>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;