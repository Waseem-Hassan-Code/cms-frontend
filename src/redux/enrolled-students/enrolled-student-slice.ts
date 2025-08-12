import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiPaginatedResponse } from "../../models/api-response";
import type { EnrolledStudentDetailDto } from "../../models/enrolled-students";
import { getEnrolledStudents } from "./enrolled-student-thunk";

interface StudentEnrollmentState {
  students: ApiPaginatedResponse<EnrolledStudentDetailDto> | null;
  loading: boolean;
  error: string | null;
  pageNumber: number;
  pageSize: number;
  searchString: string;
  classId?: string;
  sectionId?: string;
}

const initialState: StudentEnrollmentState = {
  students: null,
  loading: false,
  error: null,
  pageNumber: 1,
  pageSize: 10,
  searchString: "",
  classId: "",
  sectionId: "",
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
  },
});

export const {
  setPageNumber,
  setPageSize,
  setSearchString,
  setClassId,
  setSectionId,
  clearStudents,
} = studentEnrollmentSlice.actions;

export default studentEnrollmentSlice.reducer;
