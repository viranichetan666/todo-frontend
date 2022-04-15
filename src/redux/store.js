import { createStore, compose, applyMiddleware } from "redux";
import createReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { routerMiddleware } from "react-router-redux";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const composeEnhancer =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const persistedReducer = persistReducer(persistConfig, createReducer());

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    composeEnhancer()
  )
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor, history };
