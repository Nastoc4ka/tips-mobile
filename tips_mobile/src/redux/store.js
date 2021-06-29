import {applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import {rootReducer} from './reducers/rootReducer';
import sagaWatcher from '../saga';


const sagaMiddleware = createSagaMiddleware();


const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(sagaWatcher);

export default store