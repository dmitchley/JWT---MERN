import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from "reactstrap";

function CreateModal({ createTodo }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (title) => {
    createTodo(title);
    toggle();
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Create New Todo
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Todo</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              const [title] = event.target.children;
              handleSubmit(title);
            }}
          >
            <Input
              placeholder="Title"
              bsSize="lg"
              type="text"
              id="title"
              name="title"
              className="mb-3"
            />
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateModal;
