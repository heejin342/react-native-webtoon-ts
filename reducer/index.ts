import {combineReducers} from 'redux';
import {counter} from './counter';
import {site} from './site';

const rootReducer = combineReducers({
  counter,
  site,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
