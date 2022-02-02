import { AnyAction } from 'redux';
import { IDLE, LOADING, SUCCESS, FAILED } from '../../constants/status';
import type { IRepo } from '../../types/repo';
import { types } from './actions';

export interface IRepoState {
  getRepoStatus: string;
  newCardStatus: string;
  deleteCardStatus: string;
  updateCardStatus: string;
  repo?: IRepo;
}

export const initialState: IRepoState = {
  getRepoStatus: IDLE,
  newCardStatus: IDLE,
  updateCardStatus: IDLE,
  deleteCardStatus: IDLE,
  repo: undefined,
};

export default function repoReducer(
  state: IRepoState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case types.GET_REPO_START:
      return {
        ...state,
        getRepoStatus: LOADING,
      };
    case types.GET_REPO_SUCCESS:
      return {
        ...state,
        repo: action.payload.repo,
        getRepoStatus: SUCCESS,
      };
    case types.GET_REPO_FAILED:
      return {
        ...state,
        getRepoStatus: FAILED,
      };
    case types.CREATE_NEW_CARD_START:
      return {
        ...state,
        newCardStatus: LOADING,
      };
    case types.CREATE_NEW_CARD_SUCCESS:
      return {
        ...state,
        newCardStatus: SUCCESS,
      };
    case types.CREATE_NEW_CARD_FAILED:
      return {
        ...state,
        newCardStatus: FAILED,
      };
    case types.UPDATE_CARD_INFO_START:
      return {
        ...state,
        updateCardStatus: LOADING,
      };
    case types.UPDATE_CARD_INFO_SUCCESS:
      return {
        ...state,
        updateCardStatus: SUCCESS,
      };
    case types.UPDATE_CARD_INFO_FAILED:
      return {
        ...state,
        updateCardStatus: FAILED,
      };
    case types.DELETE_CARD_START:
      return {
        ...state,
        deleteCardStatus: LOADING,
      };
    case types.DELETE_CARD_SUCCESS:
      return {
        ...state,
        deleteCardStatus: SUCCESS,
      };
    case types.DELETE_CARD_FAILED:
      return {
        ...state,
        deleteCardStatus: FAILED,
      };
    default:
      return state;
  }
}
