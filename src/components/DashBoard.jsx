import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import { LoginContext } from './contextProvider/ContextProvider';


function DashBoard() {
  const navigate = useNavigate();
  const {loginAuthentication , setLoginAuthentication } = useContext(LoginContext);
  const userValidate = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8009/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      const data = await res.json();
      if (!res.ok) {
        return navigate("/*");
      }
      setLoginAuthentication(data);
    } catch (error) {
      console.log(error);

    }

  }

  console.log(loginAuthentication);

  useEffect(() => {
    userValidate();
  } , [])
  return (
    <Container className='d-flex justify-content-center align-items-center h-100 py-5'>

      <ul>
        <li> <strong>USer Name :</strong>  {loginAuthentication && loginAuthentication.user.name}</li>
        <li><strong>USer Email :</strong>  {loginAuthentication && loginAuthentication.user.email}</li>
      </ul>


    </Container>
  )
}

export default DashBoard