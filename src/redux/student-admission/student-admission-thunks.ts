// src/features/studentAdmission/studentAdmissionThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cms_base_api } from "../../app/middleware/cms-base-api";
import type {
  ApiPaginatedResponse,
  ApiResponse,
} from "../../models/api-response";
import type {
  GetAdmittedStudentsDto,
  StudentAdmissionForm,
} from "../../models/student-admission";
import type { RootState } from "../store";

// Submit the student form to API
export const admitStudent = createAsyncThunk<
  ApiResponse<StudentAdmissionForm>, // Response
  StudentAdmissionForm, // Request body
  { state: RootState }
>("studentAdmission/admitStudent", async (formData, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.post<ApiResponse<StudentAdmissionForm>>(
      "Student/add-student",
      formData // <-- send the body
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to admit student"
    );
  }
});

export const getStudents = createAsyncThunk<
  ApiResponse<ApiPaginatedResponse<GetAdmittedStudentsDto>>,
  { pageNumber?: number; pageSize?: number; searchString?: string },
  { state: RootState }
>("studentAdmission/getStudents", async (formData, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.get<
      ApiResponse<ApiPaginatedResponse<GetAdmittedStudentsDto>>
    >("/Student/get-students", {
      params: {
        pageNumber: formData.pageNumber ?? 1,
        pageSize: formData.pageSize ?? 10,
        searchString: formData.searchString ?? "",
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch students"
    );
  }
});

export const getStudentById = createAsyncThunk<
  ApiResponse<StudentAdmissionForm>,
  string,
  { state: RootState }
>("studentAdmission/getStudentById", async (id, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.get<ApiResponse<StudentAdmissionForm>>(
      `/Student/get-student-by-id?id=${id}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch student details"
    );
  }
});
