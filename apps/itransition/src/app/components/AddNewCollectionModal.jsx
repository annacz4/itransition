import { Formik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addUserCollection } from '../../store/actions/addUserCollection';

const collectionTopics = [
  { value: 'whisky', label: 'Whisky' },
  { value: 'books', label: 'Books' },
  { value: 'silverware', label: 'Silverware' },
];

export default function AddNewCollectionModal({
  modalVisible,
  setModalVisible,
}) {
  const dispatch = useDispatch();

  return (
    <Modal
      show={modalVisible}
      onHide={() => {
        setModalVisible(false);
      }}
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
            description: '',
            topic: collectionTopics[0].value,
            image: null,
          }}
          onSubmit={(values) => {
            dispatch(addUserCollection(values));
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            values,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="collectionName">
                <Form.Label>Collection Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </Form.Group>
              <Form.Group controlId="collectionDescription">
                <Form.Label>Collection Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  onChange={(event) => {
                    setFieldValue('description', event.currentTarget.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="collectionTopic">
                <Form.Label>Collection Topic:</Form.Label>
                <Form.Control
                  as="select"
                  name="topic"
                  onChange={(event) => {
                    setFieldValue('topic', event.currentTarget.value);
                  }}
                >
                  {collectionTopics.map((topic) => (
                    <option value={topic.value}>{topic.label}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="collectionImage">
                <Form.Label>Collection Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(event) => {
                    setFieldValue('image', event.currentTarget.files[0]);
                  }}
                />
              </Form.Group>
              <Button type="submit">Add new Collection!</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
