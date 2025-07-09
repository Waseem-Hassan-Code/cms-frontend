// src/features/studentAdmission/studentAdmissionThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cms_base_api } from "../../app/middleware/cms-base-api";
import type { ApiResponse } from "../../models/api-response";
import type { StudentAdmissionForm } from "../../models/student-admission";
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
