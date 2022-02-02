import { all } from 'redux-saga/effects';
import HomeSaga from '../pages/Home/sagas';
import RepoSaga from '../pages/Repo/sagas';

export default function* rootSaga() {
  yield all([...HomeSaga, ...RepoSaga]);
}
