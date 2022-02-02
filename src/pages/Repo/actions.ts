export const types = {
  GET_REPO_START: 'GET_REPO_START',
  GET_REPO_SUCCESS: 'GET_REPO_SUCCESS',
  GET_REPO_FAILED: 'GET_REPO_FAILED',
  CREATE_NEW_CARD_START: 'CREATE_NEW_CARD_START',
  CREATE_NEW_CARD_SUCCESS: 'CREATE_NEW_CARD_SUCCESS',
  CREATE_NEW_CARD_FAILED: 'CREATE_NEW_CARD_FAILED',
  UPDATE_CARD_INFO_START: 'UPDATE_CARD_INFO_START',
  UPDATE_CARD_INFO_SUCCESS: 'UPDATE_CARD_INFO_SUCCESS',
  UPDATE_CARD_INFO_FAILED: 'UPDATE_CARD_INFO_FAILED',
  UPDATE_CARD_STATE_START: 'UPDATE_CARD_STATE_START',
  UPDATE_CARD_STATE_SUCCESS: 'UPDATE_CARD_STATE_SUCCESS',
  UPDATE_CARD_STATE_FAILED: 'UPDATE_CARD_STATE_FAILED',
  DELETE_CARD_START: 'DELETE_CARD_START',
  DELETE_CARD_SUCCESS: 'DELETE_CARD_SUCCESS',
  DELETE_CARD_FAILED: 'DELETE_CARD_FAILED',
};

export const actions = {
  getRepoStart: (payload: { id: string }) => ({
    type: types.GET_REPO_START,
    payload,
  }),
  getRepoSuccess: (payload: object) => ({
    type: types.GET_REPO_SUCCESS,
    payload,
  }),
  getRepoFailed: (payload: object) => ({
    type: types.GET_REPO_FAILED,
    payload,
  }),
  createNewCardStart: (payload: {
    listId: string;
    text: string;
    note: string;
  }) => ({
    type: types.CREATE_NEW_CARD_START,
    payload,
  }),
  createNewCardSuccess: () => ({
    type: types.CREATE_NEW_CARD_SUCCESS,
  }),
  createNewCardFailed: (payload: object) => ({
    type: types.CREATE_NEW_CARD_FAILED,
    payload,
  }),
  updateCardInfoStart: (payload: {
    id: string;
    text: string;
    note: string;
  }) => ({
    type: types.UPDATE_CARD_INFO_START,
    payload,
  }),
  updateCardInfoSuccess: () => ({
    type: types.UPDATE_CARD_INFO_SUCCESS,
  }),
  updateCardInfoFailed: (payload: object) => ({
    type: types.UPDATE_CARD_INFO_FAILED,
    payload,
  }),
  updateCardStateStart: (payload: {
    newList: string;
    id: string;
    text: string;
    note: string;
  }) => ({
    type: types.UPDATE_CARD_STATE_START,
    payload,
  }),
  updateCardStateSuccess: () => ({
    type: types.UPDATE_CARD_STATE_SUCCESS,
  }),
  updateCardStateFailed: (payload: object) => ({
    type: types.UPDATE_CARD_STATE_FAILED,
    payload,
  }),
  deleteCardStart: (payload: { id: string }) => ({
    type: types.DELETE_CARD_START,
    payload,
  }),
  deleteCardSuccess: () => ({
    type: types.DELETE_CARD_SUCCESS,
  }),
  deleteCardFailed: (payload: object) => ({
    type: types.DELETE_CARD_FAILED,
    payload,
  }),
};
