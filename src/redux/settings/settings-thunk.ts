import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../models/api-response";
import { cms_base_api } from "../../app/middleware/cms-base-api";
import type { ApplicationSettingsDto } from "../../models/application-settings";
import type { FeeVoucherItemsDto } from "../../models/pending-fee-detail";

export const getApplicationSettings = createAsyncThunk<
  ApiResponse<ApplicationSettingsDto>,
  void,
  { rejectValue: string }
>("Settings/applicationSettings", async (_, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.get<
      ApiResponse<ApplicationSettingsDto>
    >("Settings/get-application-settings");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message ?? "Failed to load application settings"
    );
  }
});

export const updateFeeVoucherItem = createAsyncThunk<
  ApiResponse<FeeVoucherItemsDto>,
  FeeVoucherItemsDto,
  { rejectValue: string }
>(
  "Settings/updateFeeVoucherItem",
  async (feeVoucherItem, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.put<ApiResponse<FeeVoucherItemsDto>>(
        "EnrolledStudent/update-fee-voucher",
        feeVoucherItem
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ?? "Failed to update fee voucher item"
      );
    }
  }
);

export const deleteFeeVoucherItem = createAsyncThunk<
  ApiResponse<any>,
  string,
  { rejectValue: string }
>(
  "Settings/deleteFeeVoucherItem",
  async (feeVoucherItemId, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.delete<ApiResponse<any>>(
        "EnrolledStudent/delete-fee-voucher",
        { data: feeVoucherItemId }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ?? "Failed to delete fee voucher item"
      );
    }
  }
);

export const addFeeVoucherItem = createAsyncThunk<
  ApiResponse<FeeVoucherItemsDto>,
  FeeVoucherItemsDto,
  { rejectValue: string }
>("Settings/addFeeVoucherItem", async (feeVoucherItem, { rejectWithValue }) => {
  try {
    feeVoucherItem.id = null;
    const response = await cms_base_api.post<ApiResponse<FeeVoucherItemsDto>>(
      "EnrolledStudent/add-fee-voucher-item",
      feeVoucherItem
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message ?? "Failed to add fee voucher item"
    );
  }
});
