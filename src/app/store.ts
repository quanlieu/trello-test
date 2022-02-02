import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IHomeState } from '../pages/Home/reducers';
import { IRepoState } from '../pages/Repo/reducers';
import reducer from './root-reducer';
import rootSaga from './root-sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export interface RootState {
  home: IHomeState;
  repo: IRepoState;
}

export type AppDispatch = typeof store.dispatch;
