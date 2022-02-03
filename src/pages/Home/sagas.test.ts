import { all, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  getAllRepos,
  createNewRepo,
  deleteRepo,
  renameRepo,
  createNewList,
} from './sagas';
import * as reposApis from '../../apis/repos';
import * as listApis from '../../apis/list';
import { actions } from './actions';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../../constants/lists';

const error = {};
const response: AxiosResponse = {
  data: {
    id: '1',
    repos: [],
  },
  status: 0,
  statusText: '',
  headers: {},
  config: {},
};

describe('getAllRepos', () => {
  it('should trigger network call to get all repos', () => {
    const iterator = getAllRepos();
    expect(iterator.next().value).toEqual(call(reposApis.getAllRepos));
    expect(iterator.next(response).value).toEqual(
      put(actions.getAllReposSuccess({ repos: response.data.repos }))
    );
  });
  it('should put error action', () => {
    const iterator = getAllRepos();
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.getAllReposFailed(error))
    );
  });
});

describe('createNewRepo', () => {
  it('should trigger network call to create repo and 4 new lists then call get all repos', () => {
    const iterator = createNewRepo(
      actions.createNewRepoStart({ name: 'lorem' })
    );
    expect(iterator.next().value).toEqual(call(reposApis.postRepo, 'lorem'));
    expect(iterator.next(response).value).toEqual(
      all(
        [OPEN, CONFIRMED, FALSE_POSITIVE, FIXED].map((title) =>
          put(actions.createNewListStart({ repoId: '1', title }))
        )
      )
    );
    expect(iterator.next().value).toEqual(put(actions.getAllReposStart()));
  });
  it('should put error action', () => {
    const iterator = createNewRepo(
      actions.createNewRepoStart({ name: 'lorem' })
    );
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.createNewRepoFailed(error))
    );
  });
});

describe('renameRepo', () => {
  it('should trigger network call to rename a repo then call get all repos', () => {
    const iterator = renameRepo(
      actions.renameRepoStart({ id: '1', name: 'ipsum' })
    );
    expect(iterator.next().value).toEqual(
      call(reposApis.putRepoName, '1', 'ipsum')
    );
    expect(iterator.next().value).toEqual(put(actions.getAllReposStart()));
  });
  it('should put error action', () => {
    const iterator = renameRepo(
      actions.renameRepoStart({ id: '1', name: 'ipsum' })
    );
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.renameRepoFailed(error))
    );
  });
});

describe('deleteRepo', () => {
  it('should trigger network call to delete a repo then call get all repos', () => {
    const iterator = deleteRepo(actions.deleteRepoStart({ id: '1' }));
    expect(iterator.next().value).toEqual(call(reposApis.deleteRepo, '1'));
    expect(iterator.next().value).toEqual(put(actions.getAllReposStart()));
  });
  it('should put error action', () => {
    const iterator = deleteRepo(actions.deleteRepoStart({ id: '1' }));
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.deleteRepoFailed(error))
    );
  });
});

describe('createNewList', () => {
  it('should trigger network call to create a list', () => {
    const iterator = createNewList(
      actions.createNewListStart({ repoId: '1', title: OPEN })
    );
    expect(iterator.next().value).toEqual(
      call(listApis.postList, { repoId: '1', title: OPEN })
    );
  });
  it('should put error action', () => {
    const iterator = createNewList(
      actions.createNewListStart({ repoId: '1', title: OPEN })
    );
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.createNewListFailed(error))
    );
  });
});
