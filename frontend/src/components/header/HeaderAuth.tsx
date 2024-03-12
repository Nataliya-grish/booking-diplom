import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";


function HeaderAuth() {
  const isAuth = useAuth();

  return (
    <Container>

    </Container>
    )



}

export default HeaderAuth