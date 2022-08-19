import axios from "axios";
import { Table, Button, Container } from "reactstrap";
import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";

function HomePage() {
  // function to get all todos from http://localhost:5000/api/todo/ and use the token in local storage
  const [todos, setTodos] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:5000/api/todo/", {
        // get the token from local storage and authorize the user with the token
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  // logout function to remove the token from local storage and redirect to login page
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // function to create new todo and authorize with token in local storage
  // create todo function interacts with the form in CreateModal.js
  const createTodo = (title) => {
    axios
      .post(
        "http://localhost:5000/api/todo/",
        { Title: title.value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        getData();
      })
      .catch((err) => console.log(err));
  };

  // function to edit a todo and authorize with token in local storage
  // edit todo function interacts with the form in EditModal.js
  const editTodo = (id, title) => {
    axios
      .put(
        `http://localhost:5000/api/todo/${id}`,
        { Title: title.value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        getData();
      })
      .catch((err) => console.log(err));
  };

  // function to delete a todo and authorize with token in local storage
  // delete todo function interacts with the button in the table with the onClick event and gets the id of the todo to delete
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        getData();
      })
      .catch((err) => console.log(err));
  };

  // conditonally render the table if there are todos otherwise render No todos
  const displayTodos = todos.length ? (
    todos.map((todo) => {
      return (
        <tr key={todo._id}>
          <td>{todo.Title}</td>

          <td>
            <Moment format="DD/MM/YYYY">{todo.createdAt}</Moment>
          </td>

          <td>
            <EditModal id={todo._id} editTodo={editTodo} />

            <Button
              color="danger"
              onClick={() => {
                deleteTodo(todo._id);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="4">
        <h2 className="text-center">No todos found</h2>
      </td>
    </tr>
  );

  // render the table with the todos and the create todo button
  // see displayTodos variable below
  return (
    <>
      <div className=" bg-dark mb-4 p-1">
        <div className="row text-center">
          <div className="col">
            <h1 className="text-light">ToDo App</h1>
          </div>
          <div className="col  mt-2">
            <Button color="danger" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <Container>
        <div style={{ width: "90%", margin: "auto" }}>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date Created</th>
                <th>Edit & Delete</th>
              </tr>
            </thead>
            {/* the todos that mapped here */}
            <tbody>{displayTodos}</tbody>

            <CreateModal createTodo={createTodo} />
          </Table>
        </div>
      </Container>
    </>
  );
}

export default HomePage;
