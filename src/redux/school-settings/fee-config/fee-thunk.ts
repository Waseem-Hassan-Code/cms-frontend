// feeThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cms_base_api } from "../../../app/middleware/cms-base-api";
import type { ApiResponse } from "../../../models/api-response";
import type { FeeDetailsDto } from "../../../models/fee-details";

export const deleteFeeType = createAsyncThunk<
  ApiResponse<FeeDetailsDto>,
  string,
  { rejectValue: ApiResponse<null> }
>("fee/deleteFeeType", async (feeId, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.delete<ApiResponse<FeeDetailsDto>>(
      `/Fee/delete-fee-type?id=${feeId}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || { message: "Failed to delete fee type" }
    );
  }
});

export const addFeeType = createAsyncThunk<
  ApiResponse<FeeDetailsDto>,
  FeeDetailsDto,
  { rejectValue: ApiResponse<null> }
>("fee/addFeeType", async (feeDetailsDto, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.post<ApiResponse<FeeDetailsDto>>(
      `/Fee/add-fee-type`,
      feeDetailsDto
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || { message: "Failed to add fee type" }
    );
  }
});
