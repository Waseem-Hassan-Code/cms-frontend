// src/features/studentAdmission/dashboardSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../models/api-response";
import type { StudentAdmissionForm } from "../../models/student-admission";
import { admitStudent } from "./student-admission-thunks";

export interface StudentAdmissionState {
  admissionForm: ApiResponse<StudentAdmissionForm> | null;
  admissionFormData: StudentAdmissionForm | null;
  loading: boolean;
  error: string | null;
}

const initialState: StudentAdmissionState = {
  admissionForm: null,
  loading: false,
  admissionFormData: null,
  error: null,
};

export const studentAdmissionSlice = createSlice({
  name: "studentAdmission",
  initialState,
  reducers: {
    clearAdmissionForm(state) {
      state.admissionForm = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admitStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        admitStudent.fulfilled,
        (state, action: PayloadAction<ApiResponse<StudentAdmissionForm>>) => {
          state.loading = false;
          state.admissionForm = action.payload;
        }
      )
      .addCase(admitStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAdmissionForm } = studentAdmissionSlice.actions;
export default studentAdmissionSlice.reducer;
