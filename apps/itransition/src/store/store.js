import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import collectionReducers from './reducer/collectionReducers';
import collectionsSaga from './sagas/collectionSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  middleware: (defaultMiddleware) => defaultMiddleware().concat(sagaMiddleware),
  reducer: collectionReducers,
});

sagaMiddleware.run(collectionsSaga);