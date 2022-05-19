import { Formik } from 'formik';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as yup from 'yup';

const registationValidationSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup.string().required('Required'),
});

export default function RegistrationForm() {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={registationValidationSchema}
        onSubmit={async (values) => {
          const response = await fetch('http://localhost:4200/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            const responseMessage = await response.json();
            setShowError(true);
            setErrorMessage(responseMessage.message);
          }
        }}
      >
        {(formik) => (
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                isInvalid={
                  !!formik.errors.firstName && formik.touched.firstName
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                isInvalid={!!formik.errors.lastName && formik.touched.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={!!formik.errors.email && formik.touched.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={!!formik.errors.password && formik.touched.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Register</Button>
          </Form>
        )}
      </Formik>
      <Modal
        show={showError}
        onHide={() => setShowError(false)}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <span>{ errorMessage }</span>
        </Modal.Body>
      </Modal>
    </div>
  );
}
