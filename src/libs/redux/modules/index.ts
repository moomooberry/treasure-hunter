import { Action, Reducer, combineReducers } from "@reduxjs/toolkit";
import reduxPosition, { ReduxPosition } from "./position";

export interface RootState {
  reduxPosition: ReduxPosition;
}

const rootReducer: Reducer<RootState, Action> = (state, action) =>
  combineReducers({
    reduxPosition,
  })(state, action);

export default rootReducer;
