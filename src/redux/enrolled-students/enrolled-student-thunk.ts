import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type {
  ApiPaginatedResponse,
  ApiResponse,
} from "../../models/api-response";
import type { EnrolledStudentDetailDto } from "../../models/enrolled-students";
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
