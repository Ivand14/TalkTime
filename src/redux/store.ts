import { applyMiddleware, compose, createStore } from 'redux';

import RootState from './reducers';
import {thunk} from 'redux-thunk';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    RootState,
    composeEnhancer(applyMiddleware(thunk)),
);

export default store;
