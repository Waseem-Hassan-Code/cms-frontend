import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type {
  ApiPaginatedResponse,
  ApiResponse,
} from "../../models/api-response";
import type {
  EnrolledStudentDetailDto,
  StudentDetailsDto,
} from "../../models/enrolled-students";
import { cms_base_api } from "../../app/middleware/cms-base-api";

export const getEnrolledStudents = createAsyncThunk<
  ApiResponse<ApiPaginatedResponse<EnrolledStudentDetailDto>>,
  {
    pageNumber?: number;
    pageSize?: number;
    classId?: string;
    sectionId?: string;
    searchString?: string;
  },
  { state: RootState }
>(
  "enrolledStudents/getEnrolledStudents",
  async (params, { rejectWithValue }) => {
    try {
      const queryParams: any = {
        pageNumber: params.pageNumber ?? 1,
        pageSize: params.pageSize ?? 10,
      };

      if (params.classId) queryParams.classId = params.classId;
      if (params.sectionId) queryParams.sectionId = params.sectionId;
      if (params.searchString) queryParams.searchString = params.searchString;

      const response = await cms_base_api.get<
        ApiResponse<ApiPaginatedResponse<EnrolledStudentDetailDto>>
      >("/EnrolledStudent/get-enrolled-students", {
        params: queryParams,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch enrolled students"
      );
    }
  }
);

export const getStudentDetailByStudentId = createAsyncThunk<
  ApiResponse<StudentDetailsDto>,
  { id: string },
  { rejectValue: string }
>(
  "enrolledStudents/getEnrolledStudentsById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.get<ApiResponse<StudentDetailsDto>>(
        "/EnrolledStudent/get-enrolled-student-by-id",
        { params: { studentId: id } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admission voucher"
      );
    }
  }
);
