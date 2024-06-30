import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormSection from './layout/FormSection';
import LoginForm from './layout/LoginForm';



function Login() {
    console.log("log in component");
    return (
        <section className='login pt-5'>
            <Container>
                <Row>
                    <Col className='col-4 offset-4 shadow-sm  py-4 rounded-3'>
                        <FormSection heading = "WelCome Back, Log In" des ="Hi,we are you glad you are back.Please login." />
                        <LoginForm />
                    </Col>
                </Row>

            </Container>
        </section>
    )
}

export default Login