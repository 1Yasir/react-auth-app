import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';

function LoginForm() {
    console.log("LoginForm component lauout");
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [passwordShow, setPasswordShow] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8009/login", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                console.error("Login Error:", data.error);
                setAlert({ type: 'error', message: data.error });
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setAlert({ type: 'error', message: 'An error occurred. Please try again.' });
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label className='fw-bold'>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email address"
                        name='email'
                        required
                        value={formValues.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-4 position-relative" controlId="formGroupPassword">
                    <Form.Label className='fw-bold'>Password</Form.Label>
                    <Form.Control
                        type={passwordShow ? "text" : "password"}
                        placeholder="Enter Your Password"
                        name='password'
                        required
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <IconButton
                        onClick={() => setPasswordShow(!passwordShow)}
                        className='position-absolute'
                        style={{ right: "0", top: "32px" }}
                    >
                        {passwordShow ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </Form.Group>
                {alert && <Alert severity={alert.type} className='mb-3'>{alert.message}</Alert>}

                <Button variant="contained" className='w-100 mb-3' type='submit'>Login</Button>
            </Form>
            <p className='text-center'>Don't have an account? <NavLink to="/register">Sign Up</NavLink></p>
        </>
    );
}

export default LoginForm;
