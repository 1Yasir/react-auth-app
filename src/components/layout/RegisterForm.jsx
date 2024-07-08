import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';

function RegisterForm() {
    console.log("register layout component");
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: "",
        rating: "",
        age: "",
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formValues;

        console.log(formValues);
        if (password !== confirmPassword) {
            setAlert({ type: 'error', message: 'Passwords do not match' });
            return;
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
                // Handle success (e.g., redirect, clear form)
                setAlert({ type: 'success', message: 'Registration successful!' });
                setTimeout(() => {
                    navigate("/")
                }, 500)
            } else {
                console.error("Registration error:", data.error);
                setAlert({ type: 'error', message: data.error });
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setAlert({ type: 'error', message: 'An error occurred. Please try again.' });
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
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
                <Form.Group className="mb-3" controlId="formGroupAge">
                    <Form.Label className='fw-bold'>Age</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your age"
                        required
                        name='age'
                        value={formValues.age}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRating">
                    <Form.Label className='fw-bold'>Rating</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter your rating"
                        required
                        value={formValues.rating}
                        onChange={handleChange}
                        name='rating'
                        min={0}
                        max={5}
                      
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
                <div className='d-flex gap-3'>
                    <Form.Group className="mb-3" controlId="formGroupMale">
                        <Form.Label className='fw-bold'>Male</Form.Label>
                        <Form.Check
                            type="radio"
                            name='gender'
                            required
                            onChange={handleChange}
                            value="male"
                            checked={formValues.gender === 'male'}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupFeMale">
                        <Form.Label className='fw-bold'>FeMale</Form.Label>
                        <Form.Check
                            type="radio"
                            name='gender'
                            required
                            onChange={handleChange}
                            value="female"
                            checked={formValues.gender === 'female'}
                        />
                    </Form.Group>

                </div>


                <Form.Group className="mb-4 position-relative" controlId="formGroupPassword">
                    <Form.Label className='fw-bold'>Password</Form.Label>
                    <Form.Control
                        type={showPassword.password ? "text" : "password"}
                        placeholder="Enter Your Password"
                        name='password'
                        required
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <IconButton
                        onClick={() => togglePasswordVisibility('password')}
                        className='position-absolute'
                        style={{ right: "0", top: "32px" }}
                    >
                        {showPassword.password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </Form.Group>

                <Form.Group className="mb-4 position-relative" controlId="formGroupCPassword">
                    <Form.Label className='fw-bold'>Confirm Password</Form.Label>
                    <Form.Control
                        type={showPassword.confirmPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        name='confirmPassword'
                        required
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                    />
                    <IconButton
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                        className='position-absolute'
                        style={{ right: "0", top: "32px" }}
                    >
                        {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </Form.Group>
                {alert && <Alert severity={alert.type} className='mb-3'>{alert.message}</Alert>}

                <Button variant="contained" className='w-100 mb-3' type='submit'>Sign Up</Button>
            </Form>
            <p className='text-center'>Already have an account? <NavLink to="/">Log In</NavLink></p>
        </>
    );
}

export default RegisterForm;
