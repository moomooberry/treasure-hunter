import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Device } from "@src/types/device";

export interface ReduxDevice {
  device: Device;
}

const initialState: ReduxDevice = {
  device: { top: "0", bottom: "0", os: "WEB" },
};

export const reduxDevice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setReduxDevice: (_, action: PayloadAction<ReduxDevice>) => action.payload,
  },
});

export const { setReduxDevice } = reduxDevice.actions;

export default reduxDevice.reducer;
