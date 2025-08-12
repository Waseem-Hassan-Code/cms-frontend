// feeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../../models/api-response";
import type { FeeDetailsDto } from "../../../models/fee-details";
import { addFeeType, deleteFeeType } from "./fee-thunk";

interface FeeState {
  feeData: FeeDetailsDto | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: FeeState = {
  feeData: null,
  loading: false,
  error: null,
  successMessage: null,
};

const feeSlice = createSlice({
  name: "fee",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFeeType.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(
      addFeeType.fulfilled,
      (state, action: PayloadAction<ApiResponse<FeeDetailsDto>>) => {
        state.loading = false;
        if (action.payload.isSuccess) {
          state.feeData = action.payload.data || null;
          state.successMessage =
            action.payload.message || "Fee type added successfully";
        } else {
          state.error = action.payload.message || "Failed to add fee type";
        }
      }
    );
    builder.addCase(addFeeType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to add fee type";
    });

    builder.addCase(deleteFeeType.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(
      deleteFeeType.fulfilled,
      (state, action: PayloadAction<ApiResponse<FeeDetailsDto>>) => {
        state.loading = false;
        if (action.payload.isSuccess) {
          state.successMessage =
            action.payload.message || "Fee type deleted successfully";
          state.feeData = null;
        } else {
          state.error = action.payload.message || "Failed to delete fee type";
        }
      }
    );
    builder.addCase(deleteFeeType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to delete fee type";
    });
  },
});

export const { clearMessages } = feeSlice.actions;

export default feeSlice.reducer;
