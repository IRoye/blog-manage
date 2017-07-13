import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import account from './account';

/**
 * 
 * 这个account, 有点烦， 多加了一个名字，在最后要取的时候，
 * 还需要，把这个名字加上。
 * 
 */
const rootReducer = combineReducers({ account, routing: routerReducer });

export default rootReducer;

