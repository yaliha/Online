import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {AddReducer} from "./reducers/add.reducer";

const reducers = combineReducers({
        Add : AddReducer,
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store