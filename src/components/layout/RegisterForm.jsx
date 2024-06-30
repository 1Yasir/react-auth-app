import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

function RegisterForm() {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [passwordShow, setPasswordShow] = useState(true);
    const [CPasswordShow, setCPasswordShow] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formValues;
        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            const res = await fetch("http://localhost:8009/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            const data = await res.json();
            if (res.ok) {
                console.log("Registration successful:", data);
                // Add any additional success handling here
            } else {
                console.error("Registration error:", data.error);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label className='fw-bold'>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        required
                        name='name'
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </Form.Group>

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

                <Form.Group className="mb-4 position-relative" controlId="formGroupCPassword">
                    <Form.Label className='fw-bold'>Confirm Password</Form.Label>
                    <Form.Control
                        type={CPasswordShow ? "password" : "text"}
                        placeholder="Enter Your Password"
                        name='confirmPassword'
                        required
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        variant="text"
                        className='bg- position-absolute text-bg-dark'
                        style={{ right: "0", top: "32px" }}
                        onClick={() => setCPasswordShow(!CPasswordShow)}
                    >
                        {CPasswordShow ? "Show" : "Hide"}
                    </Button>
                </Form.Group>

                <Button variant="contained" className='w-100 mb-3' type='submit'>Sign Up</Button>
            </Form>
            <p className='text-center'>Already have an account? <NavLink to="/">Log In</NavLink></p>
        </>
    )
}

export default RegisterForm;
