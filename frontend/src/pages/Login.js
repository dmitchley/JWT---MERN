import React from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";
import { Form, Input, Button, Container } from "reactstrap";

function Login() {
  // loginPayload function to send the form data to the backend such as name, email and password and get the token with the response
  // the token is stored in local storage to authorize the user
  const handleSubmit = (name, email, password) => {
    console.log(name.value, email.value, password.value);

    const loginPayload = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    axios
      .post("http://localhost:5000/api/users/login", loginPayload)
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
        <h3 className="text-center mb-5">Login Page</h3>
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
              <a href="/register">Register Page</a>
            </div>

            <br></br>

            <br></br>
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
export default Login;
