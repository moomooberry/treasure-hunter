import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const LAT_DEFAULT = 37.5642135;
const LNG_DEFAULT = 127.0016985;

export interface ReduxPosition {
  position: { lat: number; lng: number };
}

const initialState: ReduxPosition = {
  position: { lat: LAT_DEFAULT, lng: LNG_DEFAULT },
};

export const reduxPosition = createSlice({
  name: "position",
  initialState,
  reducers: {
    setReduxPosition: (_, action: PayloadAction<ReduxPosition>) =>
      action.payload,
  },
});

export const { setReduxPosition } = reduxPosition.actions;

export default reduxPosition.reducer;
