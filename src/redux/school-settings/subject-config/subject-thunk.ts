import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  SubjectDto,
  CreateSubjectDto,
  UpdateSubjectDto,
} from "../../../models/school-settings";
import type { ApiResponse } from "../../../models/api-response";
import { cms_base_api } from "../../../app/middleware/cms-base-api";

export const getSubjects = createAsyncThunk<ApiResponse<SubjectDto[]>, string>(
  "subjects/getSubjects",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.get<ApiResponse<SubjectDto[]>>(
        `/Subjects/class/${classId}`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subjects"
      );
    }
  }
);

export const getAllSubjects = createAsyncThunk<ApiResponse<SubjectDto[]>, void>(
  "subjects/getAllSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.get<ApiResponse<SubjectDto[]>>(
        `/Subjects`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all subjects"
      );
    }
  }
);

export const getSubjectById = createAsyncThunk<ApiResponse<SubjectDto>, string>(
  "subjects/getSubjectById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.get<ApiResponse<SubjectDto>>(
        `/Subjects/${id}`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subject"
      );
    }
  }
);

export const addSubject = createAsyncThunk<
  ApiResponse<SubjectDto>,
  CreateSubjectDto,
  { rejectValue: string }
>("subjects/addSubject", async (subjectData, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.post<ApiResponse<SubjectDto>>(
      "/Subjects",
      subjectData
    );

    if (!response.data.isSuccess) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add subject"
    );
  }
});

export const updateSubject = createAsyncThunk<
  ApiResponse<SubjectDto>,
  UpdateSubjectDto,
  { rejectValue: string }
>("subjects/updateSubject", async (subjectData, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.put<ApiResponse<SubjectDto>>(
      "/Subjects",
      subjectData
    );

    if (!response.data.isSuccess) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update subject"
    );
  }
});

export const deleteSubject = createAsyncThunk<string, string>(
  "subjects/deleteSubject",
  async (subjectId, { rejectWithValue }) => {
    try {
      await cms_base_api.delete(`/Subjects/${subjectId}`);
      return subjectId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete subject"
      );
    }
  }
);
