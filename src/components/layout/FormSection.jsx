import React, { useState } from 'react';
import Row from "react-bootstrap/Row";

function FormSection(props) {
    const {heading , des} = props;

    console.log("FormSection in component");
    return (
        <Row className='text-center mb-3' >
            <h1>{heading}</h1>
            <p>{des}</p>

        </Row>

    )
}

export default FormSection