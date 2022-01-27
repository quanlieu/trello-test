export const types = {
  GET_ALL_REPOS_START: 'GET_ALL_REPOS_START',
  GET_ALL_REPOS_SUCCESS: 'GET_ALL_REPOS_SUCCESS',
  GET_ALL_REPOS_FAILED: 'GET_ALL_REPOS_FAILED',
  CREATE_NEW_REPO_START: 'CREATE_NEW_REPO_START',
  CREATE_NEW_REPO_SUCCESS: 'CREATE_NEW_REPO_SUCCESS',
  CREATE_NEW_REPO_FAILED: 'CREATE_NEW_REPO_FAILED',
  DELETE_REPO_START: 'DELETE_REPO_START',
  DELETE_REPO_SUCCESS: 'DELETE_REPO_SUCCESS',
  DELETE_REPO_FAILED: 'DELETE_REPO_FAILED',
  RENAME_REPO_START: 'RENAME_REPO_START',
  RENAME_REPO_SUCCESS: 'RENAME_REPO_SUCCESS',
  RENAME_REPO_FAILED: 'RENAME_REPO_FAILED',
};

export const actions = {
  getAllReposStart: () => ({
    type: types.GET_ALL_REPOS_START,
  }),
  getAllReposSuccess: (payload: object) => ({
    type: types.GET_ALL_REPOS_SUCCESS,
    payload,
  }),
  getAllReposFailed: (payload: object) => ({
    type: types.GET_ALL_REPOS_FAILED,
    payload,
  }),
  createNewRepoStart: (payload: { name: string }) => ({
    type: types.CREATE_NEW_REPO_START,
    payload,
  }),
  createNewRepoSuccess: () => ({
    type: types.CREATE_NEW_REPO_SUCCESS,
  }),
  createNewRepoFailed: (payload: object) => ({
    type: types.CREATE_NEW_REPO_FAILED,
    payload,
  }),
  deleteRepoStart: (payload: { id: string }) => ({
    type: types.DELETE_REPO_START,
    payload,
  }),
  deleteRepoSuccess: (payload: object) => ({
    type: types.DELETE_REPO_SUCCESS,
    payload,
  }),
  deleteRepoFailed: (payload: object) => ({
    type: types.DELETE_REPO_FAILED,
    payload,
  }),
  renameRepoStart: (payload: { id: string, name: string }) => ({
    type: types.RENAME_REPO_START,
    payload,
  }),
  renameRepoSuccess: (payload: object) => ({
    type: types.RENAME_REPO_SUCCESS,
    payload,
  }),
  renameRepoFailed: (payload: object) => ({
    type: types.RENAME_REPO_FAILED,
    payload,
  }),
};
