import React from "react";

import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";
import { Form, Input, Button, Container } from "reactstrap";

function Register() {
  // registerPayload function to send the form data to the backend such as name, email and password and get the token with the response
  // this function is similar to the loginPayload function in Login.js however it registers the user instead and then logs them in with the new token
  const handleSubmit = (name, email, password) => {
    console.log(name.value, email.value, password.value);

    const loginPayload = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    axios
      .post("http://localhost:5000/api/users/", loginPayload)
      .then((response) => {
        //get token from response
        const token = response.data.token;

        //set JWT token to local
        localStorage.setItem("token", token);

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="text-center bg-dark mb-4 p-1">
        <h1 className="text-light">ToDo App</h1>
      </div>
      <Container>
        <h3 className="text-center mb-5">Register Page</h3>
        <div style={{ width: "80%", margin: "auto" }}>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              const [name, email, password] = event.target.children;
              handleSubmit(name, email, password);
            }}
          >
            <Input
              placeholder="Name"
              bsSize="lg"
              type="text"
              id="name"
              name="name"
              className="mb-3"
            />

            <Input
              placeholder="Email"
              bsSize="lg"
              type="email"
              id="email"
              name="email"
              className="mb-3"
            />

            <Input
              placeholder="Password"
              bsSize="lg"
              type="password"
              id="password"
              name="password"
            />
            <div style={{ float: "right" }}>
              <a href="/login">Login Page</a>
            </div>
            <br></br>
            <Button
              color="success"
              type="submit"
              value="Submit"
              className="mt-2"
            >
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Register;
