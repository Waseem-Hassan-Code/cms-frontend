import { createSlice } from "@reduxjs/toolkit";

import { getStudentPendingFeeDetailByStudentId } from "./pending-fee-thunk";
import type { ApiResponse } from "../../../models/api-response";
import type { FeeVouchersDto } from "../../../models/pending-fee-detail";

interface EnrolledStudentsPendingFee {
  pendingFees: ApiResponse<FeeVouchersDto[]> | null;
  loading: boolean;
  error: string | null;
}

const initialState: EnrolledStudentsPendingFee = {
  pendingFees: null,
  loading: false,
  error: null,
};

const enrolledStudentsPendingFeeSlice = createSlice({
  name: "enrolledStudentsPendingFee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentPendingFeeDetailByStudentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getStudentPendingFeeDetailByStudentId.fulfilled,
        (state, action) => {
          state.loading = false;
          state.pendingFees = action.payload;
        }
      )
      .addCase(
        getStudentPendingFeeDetailByStudentId.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            (action.payload as string) || "Failed to fetch enrolled students";
        }
      );
  },
});

export const {} = enrolledStudentsPendingFeeSlice.actions;

export default enrolledStudentsPendingFeeSlice.reducer;
