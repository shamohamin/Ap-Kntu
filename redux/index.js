import {createStore, applyMiddleware, compose} from 'redux';
import { modelReducer } from "./reducers/modelReducer";
import { asyncMiddleware } from "./middleware/asyncMiddelware";


const createReduxStore = () => {
    let store;
    if (process.browser && window.navigator.userAgent.indexOf("Chrome") != -1 
            && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ){
        
        store = createStore(modelReducer, compose(
            applyMiddleware(asyncMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
        ));
    }else{
        store = createStore(modelReducer, compose(applyMiddleware(asyncMiddleware)));
    }

    return store ;
}


export default createReduxStore ;
