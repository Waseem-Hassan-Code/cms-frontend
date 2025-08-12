import { createAsyncThunk } from "@reduxjs/toolkit";
import { cms_base_api } from "../../../app/middleware/cms-base-api";
import type { ApiResponse } from "../../../models/api-response";
import type { ClassItem } from "../../../models/school-settings";
import type { RootState } from "../../store";

export const addClass = createAsyncThunk<
  ApiResponse<ClassItem>,
  ClassItem,
  { state: RootState }
>("schoolSettings/addClass", async (classData, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.post<ApiResponse<ClassItem>>(
      "/Class/add-class",
      classData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add class"
    );
  }
});

export const getClasses = createAsyncThunk<
  ApiResponse<ClassItem[]>,
  void,
  { state: RootState }
>("schoolSettings/getClasses", async (_, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.get<ApiResponse<ClassItem[]>>(
      "/Class/get-class"
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch classes"
    );
  }
});

// Delete Class
export const deleteClass = createAsyncThunk<
  ApiResponse<ClassItem>,
  string,
  { state: RootState }
>("schoolSettings/deleteClass", async (classId, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.delete<ApiResponse<ClassItem>>(
      `/Class/delete-class?classId=${classId}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete class"
    );
  }
});
