import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as reposApis from '../../apis/repos';
import * as listApis from '../../apis/list';
import { IRepo, IServerResponseRepos } from '../../types/repo';
import { types, actions } from './actions';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../../constants/lists';

export function* getAllRepos() {
  try {
    const response: { data: IServerResponseRepos } = yield call(
      reposApis.getAllRepos
    );
    yield put(actions.getAllReposSuccess({ repos: response.data.repos }));
  } catch (error: any) {
    yield put(actions.getAllReposFailed(error));
  }
}

export function* createNewRepo(
  action: ReturnType<typeof actions.createNewRepoStart>
) {
  try {
    const { data }: { data: IRepo } = yield call(
      reposApis.postRepo,
      action.payload.name
    );
    yield all(
      [OPEN, CONFIRMED, FALSE_POSITIVE, FIXED].map((title) =>
        put(actions.createNewListStart({ repoId: data.id, title }))
      )
    );
    yield put(actions.getAllReposStart());
  } catch (error: any) {
    yield put(actions.createNewRepoFailed(error));
  }
}

export function* createNewList(action: { type: string; payload: any }) {
  try {
    const { repoId, title }: { repoId: string; title: string } = action.payload;
    yield call(listApis.postList, { repoId, title });
  } catch (error: any) {
    yield put(actions.createNewListFailed(error));
  }
}

export function* deleteRepo(
  action: ReturnType<typeof actions.deleteRepoStart>
) {
  try {
    yield call(reposApis.deleteRepo, action.payload.id);
    yield put(actions.getAllReposStart());
  } catch (error: any) {
    yield put(actions.deleteRepoFailed(error));
  }
}

export function* renameRepo(
  action: ReturnType<typeof actions.renameRepoStart>
) {
  try {
    yield call(reposApis.putRepoName, action.payload.id, action.payload.name);
    yield put(actions.getAllReposStart());
  } catch (error: any) {
    yield put(actions.renameRepoFailed(error));
  }
}

const HomeSaga = [
  takeEvery(types.GET_ALL_REPOS_START, getAllRepos),
  takeEvery(types.CREATE_NEW_REPO_START, createNewRepo),
  takeEvery(types.DELETE_REPO_START, deleteRepo),
  takeEvery(types.RENAME_REPO_START, renameRepo),
  takeEvery(types.CREATE_NEW_LIST_START, createNewList),
];

export default HomeSaga;
