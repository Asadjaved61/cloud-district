import React from "react";
import CustomModal from "../modal/Modal";
import { Button, Form, Modal, ModalProps } from "react-bootstrap";

const RequestDemoForm = (props: ModalProps) => {
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Request a Demo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name={"email"}
              placeholder='Enter email'
            />
          </Form.Group>

          <Form.Group controlId='formBasicName'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' name='name' placeholder='Enter name' />
          </Form.Group>

          <Form.Group controlId='formBasicPhone'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='tel'
              name='mobile_number'
              placeholder='Enter phone number'
            />
          </Form.Group>

          <Button variant='primary' size='sm' type='submit' className='mt-2'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestDemoForm;
