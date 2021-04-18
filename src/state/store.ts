import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/covid";
import { covidReducer } from "./reducers/covidReducer";
import { chartReducer } from "./reducers/chartReducer";

const rootReducer = combineReducers({
  covidData: covidReducer,
  chartData: chartReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
