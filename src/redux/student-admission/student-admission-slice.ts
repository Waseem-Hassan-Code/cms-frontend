// src/features/studentAdmission/dashboardSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ApiPaginatedResponse,
  ApiResponse,
} from "../../models/api-response";
import type {
  GetAdmittedStudentsDto,
  StudentAdmissionForm,
  StudentEnrollmentDto,
} from "../../models/student-admission";
import {
  admitStudent,
  enrollStudent,
  getStudentById,
  getStudents,
  getStudentVoucher,
} from "./student-admission-thunks";
import type { VoucherToPdfDto } from "../../models/student-admission-voucher";

export interface StudentAdmissionState {
  admissionForm: ApiResponse<StudentAdmissionForm> | null;
  enrollmentForm: ApiResponse<StudentEnrollmentDto> | null;
  admissionFormData: StudentAdmissionForm | null;
  students: ApiPaginatedResponse<GetAdmittedStudentsDto> | null;
  studentForm: ApiResponse<StudentAdmissionForm> | null;
  studentVoucher: ApiResponse<VoucherToPdfDto> | null;
  loading: boolean;
  error: string | null;
  pageNumber: number;
  pageSize: number;
  searchString?: string;
  studentId?: string;
}

const initialState: StudentAdmissionState = {
  admissionForm: null,
  enrollmentForm: null,
  loading: false,
  admissionFormData: null,
  studentForm: null,
  studentVoucher: null,
  students: null,
  error: null,
  pageNumber: 1,
  pageSize: 10,
  searchString: "",
  studentId: "",
};

export const studentAdmissionSlice = createSlice({
  name: "studentAdmission",
  initialState,
  reducers: {
    clearAdmissionForm(state) {
      state.admissionForm = null;
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
    setStudentId(state, action: PayloadAction<string>) {
      state.studentId = action.payload;
    },
    clearParams(state) {
      state.pageNumber = 1;
      state.pageSize = 10;
      state.searchString = "";
    },
    clearStudents(state) {
      state.students = null;
    },
    clearStudentId(state) {
      state.studentId = "";
      state.studentForm = null;
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
      })
      //===================================================================

      .addCase(enrollStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        enrollStudent.fulfilled,
        (state, action: PayloadAction<ApiResponse<StudentEnrollmentDto>>) => {
          state.loading = false;
          state.enrollmentForm = action.payload;
        }
      )
      .addCase(enrollStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //===================================================================
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getStudents.fulfilled,
        (
          state,
          action: PayloadAction<
            ApiResponse<ApiPaginatedResponse<GetAdmittedStudentsDto>>
          >
        ) => {
          state.students = action.payload.data;
          state.loading = false;
          state.error = null;
        }
      )
      //===================================================================
      .addCase(
        getStudentVoucher.fulfilled,
        (state, action: PayloadAction<ApiResponse<VoucherToPdfDto>>) => {
          state.loading = false;
          state.studentVoucher = action.payload; // full ApiResponse
          state.error = null;
        }
      )
      .addCase(getStudentVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //===================================================================
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.studentForm = action.payload;
        state.error = null;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearAdmissionForm,
  setPageNumber,
  setPageSize,
  setSearchString,
  clearParams,
  clearStudents,
  setStudentId,
  clearStudentId,
} = studentAdmissionSlice.actions;
export default studentAdmissionSlice.reducer;
