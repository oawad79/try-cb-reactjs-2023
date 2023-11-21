import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"
import logger from 'redux-logger'
import { rootSaga } from "./sagas";
import hotelsReducer from './slices/hotelsSlice'
import toastsReducer from './slices/toastsSlice'
import tabsReducer from './slices/tabsSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

//using redux-persist to store the redux state to 
//keep the store state when browser refreshed 
//or the react router navigates
const persistConfig = {
  key: 'root',
  storage,
}

const sagaMiddleware = createSagaMiddleware({
  //Saga issues, if not handled, will pubble up to the root Saga which then terminates
  //onError will receive the pubbled issue and emit an ERROR
  //this will not stop terminating Sagas, this is just logging before shutting down
  onError(error: Error) {
    console.log(`Error = ${error}`)
    store.dispatch({ type: 'ERROR', payload: error })
  }
})

const rootReducer = combineReducers({ 
  hotels: hotelsReducer,
  toasts: toastsReducer,
  tabs: tabsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ thunk: false, serializableCheck: false })
        .concat(sagaMiddleware)
        .concat(logger),
    devTools: {
      trace: true
    }
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

