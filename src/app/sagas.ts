import { all } from 'redux-saga/effects';
import HomeSaga from '../pages/Home/sagas';

export default function* rootSaga() {
  yield all([...HomeSaga]);
}
