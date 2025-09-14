import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../models/api-response";
import { cms_base_api } from "../../app/middleware/cms-base-api";
import type { ApplicationSettingsDto } from "../../models/application-settings";

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
