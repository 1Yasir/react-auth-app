import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import { LoginContext } from './contextProvider/ContextProvider';

function DashBoard() {
    const navigate = useNavigate();
    const { loginAuthentication, setLoginAuthentication } = useContext(LoginContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userValidate = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await fetch("http://localhost:8009/dashboard", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    navigate("*");
                    return;
                }

                const data = await res.json();
                setLoginAuthentication(data);
            } catch (error) {
                console.error("Fetch error:", error);
                // Handle fetch errors here
            } finally {
                setLoading(false);
            }
        };

        userValidate();
    }, [navigate, setLoginAuthentication]);

    if (loading) {
        return <Container className='d-flex justify-content-center align-items-center h-100 py-5'>Loading...</Container>;
    }

    return (
        <Container className='d-flex justify-content-center align-items-center h-100 py-5'>
            <ul>
                <li><strong>User Name:</strong> {loginAuthentication?.user?.name}</li>
                <li><strong>User Email:</strong> {loginAuthentication?.user?.email}</li>
            </ul>
        </Container>
    );
}

export default DashBoard;
