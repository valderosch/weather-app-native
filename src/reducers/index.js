import {applyMiddleware, combineReducers} from "redux";
import weatherReducer from './weatherReducer';
import utilsReducer from './utilsReducer';
import {createStore} from "redux/src/createStore";
import {composeWithDevTools} from '@redux-devtools/extension'
import {thunk} from "redux-thunk";

const mainReducer = combineReducers({
    weather: weatherReducer,
    utils: utilsReducer,
})

export const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));