import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../../models/api-response";
import { cms_base_api } from "../../../app/middleware/cms-base-api";
import type { FeeVouchersDto } from "../../../models/pending-fee-detail";

export const getStudentPendingFeeDetailByStudentId = createAsyncThunk<
  ApiResponse<FeeVouchersDto[]>,
  { id: string },
  { rejectValue: string }
>(
  "enrolledStudents/getStudentPendingFeeDetailByStudentId",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.get<ApiResponse<FeeVouchersDto[]>>(
        "/EnrolledStudent/get-enrolled-student-pending-fee-detail-id",
        { params: { studentId: id } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pending fee details"
      );
    }
  }
);
