import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Card className="template text-center">
        <Card.Header>MERN-Auth Template</Card.Header>
        <Card.Body>
          <Card.Text>
            This is a login/registration authentication template for a MERN
            stack application. This template does not use AppContext to manage
            state. Instead, this template uses authentication middleware in both
            the server and client environments.
          </Card.Text>
          <Button variant="primary">GitHub Repo</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Home;
