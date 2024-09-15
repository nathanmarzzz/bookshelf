import { configureStore, createReducer, applyMiddleware } from "@reduxjs/toolkit";
// import {composeWithDevTools} from '@redux-devtools/extension'

// const reducer = createReducer({})

// const composeEnhancers = composeWithDevTools({
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   });

export const store = configureStore({
    reducer: {},
    devTools: true,
    // composeWithDevTools()

})