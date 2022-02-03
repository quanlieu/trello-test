import { select, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  getRepo,
  createNewCard,
  updateCardInfo,
  updateCardState,
  deleteCard,
} from './sagas';
import * as reposApis from '../../apis/repos';
import * as cardApis from '../../apis/card';
import { actions } from './actions';
import * as repoSelectors from './selectors';
import * as mockLists from '../../constants/lists';

const error = {};
const response: AxiosResponse = {
  data: {
    name: 'lorem',
    id: '1',
    lists: [
      {
        title: mockLists.OPEN,
        cards: [
          { text: 'Vulnerability 1', id: 'm-card' },
          { text: 'Vulnerability 2', id: 'n-card' },
        ],
        id: 'open-list',
      },
      {
        title: mockLists.CONFIRMED,
        cards: [],
        id: 'confirm-list',
      },
      {
        title: mockLists.FALSE_POSITIVE,
        cards: [],
        id: 'false-list',
      },
      {
        title: mockLists.FIXED,
        cards: [],
        id: 'fixed-list',
      },
    ],
  },
  status: 0,
  statusText: '',
  headers: {},
  config: {},
};

describe('getAllRepos', () => {
  it('should trigger network call to get all repos', () => {
    const iterator = getRepo(actions.getRepoStart({ id: '1' }));
    expect(iterator.next().value).toEqual(call(reposApis.getRepo, '1'));
    expect(iterator.next(response).value).toEqual(
      put(actions.getRepoSuccess({ repo: response.data }))
    );
  });
  it('should put error action', () => {
    const iterator = getRepo(actions.getRepoStart({ id: '1' }));
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.getRepoFailed(error))
    );
  });
});

describe('createNewCard', () => {
  it('should trigger network call to create new card then call get repo', () => {
    const iterator = createNewCard(
      actions.createNewCardStart({ listId: '1', text: 'lorem', note: 'ipsum' })
    );
    expect(iterator.next().value).toEqual(
      call(cardApis.postCard, { listId: '1', text: 'lorem', note: 'ipsum' })
    );
    expect(iterator.next().value).toEqual(put(actions.createNewCardSuccess()));
    expect(iterator.next().value).toEqual(select(repoSelectors.selectRepo));
    expect(iterator.next(response.data).value).toEqual(
      put(actions.getRepoStart({ id: response.data.id }))
    );
  });
  it('should put error action', () => {
    const iterator = createNewCard(
      actions.createNewCardStart({ listId: '1', text: 'lorem', note: 'ipsum' })
    );
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.createNewCardFailed(error))
    );
  });
});

describe('updateCardInfo', () => {
  it('should trigger network call to edit card then call get repo', () => {
    const iterator = updateCardInfo(
      actions.updateCardInfoStart({ id: '1', text: 'lorem', note: 'ipsum' })
    );
    expect(iterator.next().value).toEqual(
      call(cardApis.putCard, { id: '1', text: 'lorem', note: 'ipsum' })
    );
    expect(iterator.next().value).toEqual(put(actions.updateCardInfoSuccess()));
    expect(iterator.next().value).toEqual(select(repoSelectors.selectRepo));
    expect(iterator.next(response.data).value).toEqual(
      put(actions.getRepoStart({ id: response.data.id }))
    );
  });
  it('should put error action', () => {
    const iterator = updateCardInfo(
      actions.updateCardInfoStart({ id: '1', text: 'lorem', note: 'ipsum' })
    );
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.updateCardInfoFailed(error))
    );
  });
});

describe('updateCardState', () => {
  it('should trigger network call to edit card then call get repo', () => {
    const iterator = updateCardState(
      actions.updateCardStateStart({
        id: '1',
        text: 'lorem',
        note: 'ipsum',
        newList: mockLists.CONFIRMED,
      })
    );
    expect(iterator.next().value).toEqual(select(repoSelectors.selectRepo));
    expect(iterator.next(response.data).value).toEqual(
      call(cardApis.postCard, {
        listId: 'confirm-list',
        text: 'lorem',
        note: 'ipsum',
      })
    );
    expect(iterator.next(response.data).value).toEqual(
      call(cardApis.deleteCard, { id: '1' })
    );
    expect(iterator.next().value).toEqual(put(actions.updateCardInfoSuccess()));
    expect(iterator.next().value).toEqual(
      put(actions.getRepoStart({ id: response.data.id }))
    );
  });
  it('should put error action', () => {
    const iterator = updateCardState(
      actions.updateCardStateStart({
        id: '1',
        text: 'lorem',
        note: 'ipsum',
        newList: mockLists.CONFIRMED,
      })
    );
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.updateCardStateFailed(error))
    );
  });
});

describe('deleteCard', () => {
  it('should trigger network call to edit card then call get repo', () => {
    const iterator = deleteCard(actions.deleteCardStart({ id: '1' }));
    expect(iterator.next().value).toEqual(
      call(cardApis.deleteCard, { id: '1' })
    );
    expect(iterator.next().value).toEqual(put(actions.deleteCardSuccess()));
    expect(iterator.next().value).toEqual(select(repoSelectors.selectRepo));
    expect(iterator.next(response.data).value).toEqual(
      put(actions.getRepoStart({ id: response.data.id }))
    );
  });
  it('should put error action', () => {
    const iterator = deleteCard(actions.deleteCardStart({ id: '1' }));
    iterator.next();
    expect(iterator.throw(error).value).toEqual(
      put(actions.deleteCardFailed(error))
    );
  });
});
