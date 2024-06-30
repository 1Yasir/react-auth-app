import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [passwordShow, setPasswordShow] = useState(true);
    console.log("loginForm in component");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8009/login", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                console.log("Login Error:", data.error);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
        // Add form submission logic here
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
                        type={passwordShow ? "password" : "text"}
                        placeholder="Enter Your Password"
                        name='password'
                        required
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <Button
                        variant="text"
                        className='bg- position-absolute text-bg-dark'
                        style={{ right: "0", top: "32px" }}
                        onClick={() => setPasswordShow(!passwordShow)}
                    >
                        {passwordShow ? "Show" : "Hide"}
                    </Button>
                </Form.Group>

                <Button variant="contained" className='w-100 mb-3' type='submit'>Login</Button>
            </Form>
            <p className='text-center'>Don't have an Account? <NavLink to="register">Sign Up</NavLink></p>
        </>
    );
}

export default LoginForm;
