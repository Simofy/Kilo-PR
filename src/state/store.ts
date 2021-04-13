import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/gameSaga";
import { game } from "./reducers/game";
import { color } from "./reducers/color";

const rootReducer = combineReducers({
  boardData: game,
  color: color,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
