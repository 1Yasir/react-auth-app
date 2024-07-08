import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormSection from './layout/FormSection';
import RegisterForm from './layout/RegisterForm';
function Register() {
    console.log("Register Component parent , formsection registerform");
    return (
        <section className='register pt-5'>
            <Container>
                <Row>
                    <Col className='col-4 offset-4 shadow-sm  py-4 rounded-3'>
                        <FormSection heading="Sign Up" des="we are glad you will be using  Project Cloud to manage your tasks! we hope that you will get like it." />
                        <RegisterForm />
                    </Col>
                </Row>

            </Container>

        </section>
    )
}

export default Register