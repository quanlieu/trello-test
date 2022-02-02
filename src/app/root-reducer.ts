import { combineReducers } from 'redux';
import home from '../pages/Home/reducers';
import repo from '../pages/Repo/reducers'

const rootReducer = combineReducers({ home, repo });

export default rootReducer;
