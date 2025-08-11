import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../models/api-response";
import type {
  FeeDetailsDto,
  StudentFeeVoucher,
} from "../../models/fee-details";
import { cms_base_api } from "../../app/middleware/cms-base-api";

export const getFeeTypes = createAsyncThunk<ApiResponse<FeeDetailsDto[]>, void>(
  "FeeDetails/getFeeTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.get<ApiResponse<FeeDetailsDto[]>>(
        "Fee/get-fee-types"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch fee types"
      );
    }
  }
);

export const getAdmissionVoucher = createAsyncThunk<
  ApiResponse<StudentFeeVoucher>,
  { id: string },
  { rejectValue: string }
>("FeeDetails/getAdmissionVoucher", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.get<ApiResponse<StudentFeeVoucher>>(
      "Fee/get-admission-voucher",
      { params: { id } }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch admission voucher"
    );
  }
});

export const addFeeVoucher = createAsyncThunk<
  ApiResponse<string>,
  StudentFeeVoucher,
  { rejectValue: string }
>("FeeDetails/addFeeVoucher", async (voucher, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.post<ApiResponse<string>>(
      "Fee/add-fee-voucher",
      voucher
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add fee voucher"
    );
  }
});
