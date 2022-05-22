import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUserCollections } from '../../store/actions/loadUserCollections';
import AddNewCollectionModal from './AddNewCollectionModal';

export default function alertClicked() {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUserCollections());
  }, [dispatch]);

  return (
    <>
      <ListGroup>
        {collections &&
          collections.map((collection) => (
            <ListGroup.Item
              action
              onClick={() => navigate(`/collection/${collection.id}`)}
            >
              {collection.name}
            </ListGroup.Item>
          ))}
      </ListGroup>
      <Button
        onClick={() => {
          setModalVisible(true);
        }}
      >
        Add new Item
      </Button>
      <AddNewCollectionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
    // <ListGroup defaultActiveKey="#link1">
    //   <ListGroup.Item action href="#link1">
    //     Link 1
    //   </ListGroup.Item>
    //   <ListGroup.Item action href="#link2" disabled>
    //     Link 2
    //   </ListGroup.Item>
    //   <ListGroup.Item action onClick={() => {}}>
    //     This one is a button
    //   </ListGroup.Item>
    // </ListGroup>
  );
}
