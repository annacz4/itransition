import { takeEvery, put } from 'redux-saga/effects';
import { addUserCollection } from '../actions/addUserCollection';
import {
  loadUserCollections,
  loadUserCollectionsSuccess,
} from '../actions/loadUserCollections';

function* loadCollectionsSaga() {
  try {
    const token = localStorage.getItem('token');
    const result = yield fetch('http://localhost:3333/collections', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    const data = yield result.json();
    console.log(data);
    yield put(loadUserCollectionsSuccess(data));
  } catch (e) {
    //
  }
}

function* addCollectionSaga({ payload }) {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    yield fetch('http://localhost:3333/collections', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: token,
      },
    });
    yield put(loadUserCollections());

  } catch (e) {
    console.error(e);
  }
}

export default function* collectionsSaga() {
  yield takeEvery(loadUserCollections, loadCollectionsSaga);
  yield takeEvery(addUserCollection, addCollectionSaga);
}
