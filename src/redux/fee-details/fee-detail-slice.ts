import { createSlice } from "@reduxjs/toolkit";
import type { FeeDetailsDto } from "../../models/fee-details";
import { getFeeTypes, addFeeVoucher } from "./fee-detail-thunk";

export interface FeeDetailState {
  feeDetails: FeeDetailsDto[] | null;
  loading: boolean;
  error: string | null;
  addVoucherLoading: boolean;
  addVoucherError: string | null;
  lastAddedVoucherId: string | null;
}

const initialState: FeeDetailState = {
  feeDetails: null,
  loading: false,
  error: null,
  addVoucherLoading: false,
  addVoucherError: null,
  lastAddedVoucherId: null,
};

export const feeDetailSlice = createSlice({
  name: "FeeDetails",
  initialState,
  reducers: {
    clearFeeTypes: (state) => {
      state.feeDetails = null;
      state.loading = false;
      state.error = null;
    },
    clearVoucherStatus: (state) => {
      state.addVoucherLoading = false;
      state.addVoucherError = null;
      state.lastAddedVoucherId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Get Fee Types
      .addCase(getFeeTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.feeDetails = action.payload.data || [];
      })
      .addCase(getFeeTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Add Fee Voucher
      .addCase(addFeeVoucher.pending, (state) => {
        state.addVoucherLoading = true;
        state.addVoucherError = null;
        state.lastAddedVoucherId = null;
      })
      .addCase(addFeeVoucher.fulfilled, (state, action) => {
        state.addVoucherLoading = false;
        state.lastAddedVoucherId = action.payload.data || null;
      })
      .addCase(addFeeVoucher.rejected, (state, action) => {
        state.addVoucherLoading = false;
        state.addVoucherError = action.payload as string;
      });
  },
});

export const { clearFeeTypes, clearVoucherStatus } = feeDetailSlice.actions;

export default feeDetailSlice.reducer;
