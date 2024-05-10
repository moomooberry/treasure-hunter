import { Action, Reducer, combineReducers } from "@reduxjs/toolkit";
import reduxPosition, { ReduxPosition } from "./position";
import reduxDevice, { ReduxDevice } from "./device";

export interface RootState {
  reduxPosition: ReduxPosition;
  reduxDevice: ReduxDevice;
}

const rootReducer: Reducer<RootState, Action> = (state, action) =>
  combineReducers({
    reduxPosition,
    reduxDevice,
  })(state, action);

export default rootReducer;
