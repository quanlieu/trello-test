import { select, call, put, takeEvery } from 'redux-saga/effects';
import * as reposApis from '../../apis/repos';
import * as cardApis from '../../apis/card';
import { IRepo } from '../../types/repo';
import { types, actions } from './actions';
import { selectRepo } from './selectors';

export function* getRepo(action: ReturnType<typeof actions.getRepoStart>) {
  try {
    const response: { data: IRepo } = yield call(
      reposApis.getRepo,
      action.payload.id
    );
    yield put(actions.getRepoSuccess({ repo: response.data }));
  } catch (error: any) {
    yield put(actions.getRepoFailed(error));
  }
}

export function* createNewCard(
  action: ReturnType<typeof actions.createNewCardStart>
) {
  try {
    const repo: IRepo = yield select(selectRepo);
    yield call(cardApis.postCard, action.payload);
    yield put(actions.createNewCardSuccess());
    yield put(actions.getRepoStart({ id: repo.id }));
  } catch (error: any) {
    yield put(actions.deleteCardFailed(error));
  }
}

export function* updateCardInfo(
  action: ReturnType<typeof actions.updateCardInfoStart>
) {
  try {
    const repo: IRepo = yield select(selectRepo);
    yield call(cardApis.putCard, action.payload);
    yield put(actions.updateCardInfoSuccess());
    yield put(actions.getRepoStart({ id: repo.id }));
  } catch (error: any) {
    yield put(actions.updateCardInfoFailed(error));
  }
}

export function* deleteCard(
  action: ReturnType<typeof actions.deleteCardStart>
) {
  try {
    const repo: IRepo = yield select(selectRepo);
    yield call(cardApis.deleteCard, action.payload);
    yield put(actions.deleteCardSuccess());
    yield put(actions.getRepoStart({ id: repo.id }));
  } catch (error: any) {
    yield put(actions.deleteCardFailed(error));
  }
}

// Change card to another list (change state) is actually delete the card and
//   create a new one in different list
export function* updateCardState(
  action: ReturnType<typeof actions.updateCardStateStart>
) {
  try {
    const repo: IRepo = yield select(selectRepo);
    const { newList, ...payload } = action.payload;
    const newListId = repo?.lists.find((v) => v.title === newList)?.id || '';
    yield call(cardApis.postCard, { ...payload, listId: newListId });
    yield call(cardApis.deleteCard, payload);
    yield put(actions.deleteCardSuccess());
    yield put(actions.getRepoStart({ id: repo.id }));
  } catch (error: any) {
    yield put(actions.deleteCardFailed(error));
  }
}

const RepoSaga = [
  takeEvery(types.GET_REPO_START, getRepo),
  takeEvery(types.CREATE_NEW_CARD_START, createNewCard),
  takeEvery(types.UPDATE_CARD_INFO_START, updateCardInfo),
  takeEvery(types.UPDATE_CARD_STATE_START, updateCardState),
  takeEvery(types.DELETE_CARD_START, deleteCard),
];

export default RepoSaga;
