import { AnyAction } from 'redux';
import { IDLE, LOADING, SUCCESS, FAILED } from '../../constants/status';
import type { IRepo } from '../../types/repo';
import { types } from './actions';

export interface IHomeState {
  getReposStatus: string;
  newRepoStatus: string;
  deleteRepoStatus: string;
  renameRepoStatus: string;
  repos: IRepo[];
}

export const initialState: IHomeState = {
  getReposStatus: IDLE,
  newRepoStatus: IDLE,
  deleteRepoStatus: IDLE,
  renameRepoStatus: IDLE,
  repos: [],
};

export default function homeReducer(
  state: IHomeState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case types.GET_ALL_REPOS_START:
      return {
        ...state,
        getReposStatus: LOADING,
      };
    case types.GET_ALL_REPOS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        getReposStatus: SUCCESS,
      };
    case types.GET_ALL_REPOS_FAILED:
      return {
        ...state,
        getReposStatus: FAILED,
      };
    case types.CREATE_NEW_REPO_START:
      return {
        ...state,
        newRepoStatus: LOADING,
      };
    case types.CREATE_NEW_REPO_SUCCESS:
      return {
        ...state,
        newRepoStatus: SUCCESS,
      };
    case types.CREATE_NEW_REPO_FAILED:
      return {
        ...state,
        newRepoStatus: FAILED,
      };
    case types.DELETE_REPO_START:
      return {
        ...state,
        deleteRepoStatus: LOADING,
      };
    case types.DELETE_REPO_SUCCESS:
      return {
        ...state,
        deleteRepoStatus: SUCCESS,
      };
    case types.DELETE_REPO_FAILED:
      return {
        ...state,
        deleteRepoStatus: FAILED,
      };
    case types.RENAME_REPO_START:
      return {
        ...state,
        renameRepoStatus: LOADING,
      };
    case types.RENAME_REPO_SUCCESS:
      return {
        ...state,
        renameRepoStatus: SUCCESS,
      };
    case types.RENAME_REPO_FAILED:
      return {
        ...state,
        renameRepoStatus: FAILED,
      };
    default:
      return state;
  }
}
