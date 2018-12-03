import {createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState={};
const midlleware=[thunk];
const store=createStore(
                        rootReducer,
                        initialState,
                        compose(
                            applyMiddleware(...midlleware)
                        )
                         )
export default store;