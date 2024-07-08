import Container from 'react-bootstrap/Container';
import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { LoginContext } from './contextProvider/ContextProvider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
    const { loginAuthentication, setLoginAuthentication } = useContext(LoginContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Clear localStorage token
        localStorage.removeItem("token");
        // Reset login authentication state
        setLoginAuthentication(null);
        // Redirect to login page
        navigate("/");
        // Close menu
        handleClose();
    };

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
                            <Avatar className='bg-primary text-capitalize' onClick={handleClick}>
                                {loginAuthentication ? loginAuthentication.user?.name[0] : <PersonIcon />}
                            </Avatar>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                {loginAuthentication && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
                            </Menu>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
