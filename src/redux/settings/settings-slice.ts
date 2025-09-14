import { createSlice } from "@reduxjs/toolkit";
import type { ApplicationSettingsDto } from "../../models/application-settings";
import { getApplicationSettings } from "./settings-thunk";

export interface ApplicationSettingState {
  settings: ApplicationSettingsDto | null;
  loading: boolean;
  error: string | null;
  lastLoadedAt?: string | null;
}

const initialState: ApplicationSettingState = {
  settings: null,
  loading: false,
  error: null,
  lastLoadedAt: null,
};

const applicationSettingSlice = createSlice({
  name: "applicationSettings",
  initialState,
  reducers: {
    clearSettings: (state) => {
      state.settings = null;
      state.loading = false;
      state.error = null;
      state.lastLoadedAt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicationSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload.data;

        state.lastLoadedAt = new Date().toISOString();
      })
      .addCase(getApplicationSettings.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Failed to load application settings";
      });
  },
});

export const { clearSettings } = applicationSettingSlice.actions;
export default applicationSettingSlice.reducer;
