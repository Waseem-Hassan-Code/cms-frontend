import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiPaginatedResponse } from "../../models/api-response";
import type {
  EnrolledStudentDetailDto,
  StudentDetailsDto,
} from "../../models/enrolled-students";
import {
  addMonthlyFeeVoucher,
  createOrUpdateMontlyFee,
  getEnrolledStudents,
  getStudentDetailByStudentId,
} from "./enrolled-student-thunk";

interface StudentEnrollmentState {
  students: ApiPaginatedResponse<EnrolledStudentDetailDto> | null;
  studentDetails: StudentDetailsDto | null;
  loading: boolean;
  error: string | null;
  pageNumber: number;
  pageSize: number;
  searchString: string;
  classId?: string;
  sectionId?: string;
  selectedStudentId?: string;
  studentTuitionFee?: number;
}

const initialState: StudentEnrollmentState = {
  students: null,
  studentDetails: null,
  loading: false,
  error: null,
  pageNumber: 1,
  pageSize: 10,
  searchString: "",
  classId: "",
  sectionId: "",
  selectedStudentId: "",
  studentTuitionFee: 0,
};

const studentEnrollmentSlice = createSlice({
  name: "studentEnrollment",
  initialState,
  reducers: {
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
    setClassId(state, action: PayloadAction<string | undefined>) {
      state.classId = action.payload;
    },
    setSectionId(state, action: PayloadAction<string | undefined>) {
      state.sectionId = action.payload;
    },
    clearStudents(state) {
      state.students = null;
      state.error = null;
    },
    setSelectedStudentId(state, action: PayloadAction<string | undefined>) {
      state.selectedStudentId = action.payload;
    },
    clearStudentDetail(state) {
      state.studentDetails = null;
    },
    setStudentTutionFee(state, action: PayloadAction<number | undefined>) {
      state.studentTuitionFee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnrolledStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnrolledStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.data;
      })
      .addCase(getEnrolledStudents.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch enrolled students";
      });

    builder
      .addCase(getStudentDetailByStudentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentDetailByStudentId.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDetails = action.payload.data;
      })
      .addCase(getStudentDetailByStudentId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch student details";
      });

    builder
      .addCase(addMonthlyFeeVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMonthlyFeeVoucher.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addMonthlyFeeVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch student details";
      });

    builder
      .addCase(createOrUpdateMontlyFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrUpdateMontlyFee.fulfilled, (state, action) => {
        state.loading = false;
        state.studentTuitionFee = action.payload.data;
      })
      .addCase(createOrUpdateMontlyFee.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch student details";
      });
  },
});

export const {
  setPageNumber,
  setPageSize,
  setSearchString,
  setClassId,
  setSectionId,
  clearStudents,
  setSelectedStudentId,
  clearStudentDetail,
  setStudentTutionFee,
} = studentEnrollmentSlice.actions;

export default studentEnrollmentSlice.reducer;
