import { createSlice } from "@reduxjs/toolkit";
import type { ApplicationSettingsDto } from "../../models/application-settings";
import {
  getApplicationSettings,
  updateFeeVoucherItem,
  deleteFeeVoucherItem,
  addFeeVoucherItem,
} from "./settings-thunk";

export interface ApplicationSettingState {
  settings: ApplicationSettingsDto | null;
  loading: boolean;
  error: string | null;
  lastLoadedAt?: string | null;
  updating: boolean;
  updateError: string | null;
  deleting: boolean;
  deleteError: string | null;
  adding: boolean;
  addError: string | null;
}

const initialState: ApplicationSettingState = {
  settings: null,
  loading: false,
  error: null,
  lastLoadedAt: null,
  updating: false,
  updateError: null,
  deleting: false,
  deleteError: null,
  adding: false,
  addError: null,
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
    clearUpdateError: (state) => {
      state.updateError = null;
    },
    clearDeleteError: (state) => {
      state.deleteError = null;
    },
    clearAddError: (state) => {
      state.addError = null;
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
      })
      // Update Fee Voucher Item
      .addCase(updateFeeVoucherItem.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateFeeVoucherItem.fulfilled, (state) => {
        state.updating = false;
        // Update will be handled in the component by refetching data
      })
      .addCase(updateFeeVoucherItem.rejected, (state, action) => {
        state.updating = false;
        state.updateError =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Failed to update fee voucher item";
      })
      // Delete Fee Voucher Item
      .addCase(deleteFeeVoucherItem.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteFeeVoucherItem.fulfilled, (state) => {
        state.deleting = false;
        // Delete will be handled in the component by refetching data
      })
      .addCase(deleteFeeVoucherItem.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Failed to delete fee voucher item";
      })
      // Add Fee Voucher Item
      .addCase(addFeeVoucherItem.pending, (state) => {
        state.adding = true;
        state.addError = null;
      })
      .addCase(addFeeVoucherItem.fulfilled, (state) => {
        state.adding = false;
        // Add will be handled in the component by updating local state
      })
      .addCase(addFeeVoucherItem.rejected, (state, action) => {
        state.adding = false;
        state.addError =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Failed to add fee voucher item";
      });
  },
});

export const {
  clearSettings,
  clearUpdateError,
  clearDeleteError,
  clearAddError,
} = applicationSettingSlice.actions;
export default applicationSettingSlice.reducer;
