import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SectionsDto } from "../../../models/school-settings";
import type { ApiResponse } from "../../../models/api-response";
import { cms_base_api } from "../../../app/middleware/cms-base-api";

export const getSections = createAsyncThunk<ApiResponse<SectionsDto[]>, string>(
  "sections/getSections",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.get<ApiResponse<SectionsDto[]>>(
        `/Section/get-section`,
        {
          params: { classId },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sections"
      );
    }
  }
);

export const addSection = createAsyncThunk<
  ApiResponse<SectionsDto>,
  SectionsDto,
  { rejectValue: string }
>("sections/addSection", async (sectionData, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.post<ApiResponse<SectionsDto>>(
      "/Section/add-section",
      sectionData
    );

    if (!response.data.isSuccess) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add section"
    );
  }
});

export const deleteSection = createAsyncThunk<string, string>(
  "sections/deleteSection",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.delete<ApiResponse<null>>(
        `/Section/delete-section`,
        { params: { sectionId } }
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }

      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete section" }
      );
    }
  }
);
