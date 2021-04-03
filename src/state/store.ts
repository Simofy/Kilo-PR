import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/gameSaga";
import { game } from "./reducers/game";

const rootReducer = combineReducers({
  boardData: game,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
