import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ResultCardDto,
  CreateResultCardDto,
  UpdateResultCardDto,
  UpdateResultEntryDto,
} from "../../models/school-settings";
import type { ApiResponse } from "../../models/api-response";
import { cms_base_api } from "../../app/middleware/cms-base-api";

export const getAllResultCards = createAsyncThunk<
  ApiResponse<ResultCardDto[]>,
  void
>("resultCards/getAllResultCards", async (_, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.get<ApiResponse<ResultCardDto[]>>(
      `/ResultCards`
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch result cards"
    );
  }
});

export const getResultCardById = createAsyncThunk<
  ApiResponse<ResultCardDto>,
  string
>("resultCards/getResultCardById", async (id, { rejectWithValue }) => {
  try {
    const response = await cms_base_api.get<ApiResponse<ResultCardDto>>(
      `/ResultCards/${id}`
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch result card"
    );
  }
});

export const getResultCardsByStudentId = createAsyncThunk<
  ApiResponse<ResultCardDto[]>,
  string
>(
  "resultCards/getResultCardsByStudentId",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.get<ApiResponse<ResultCardDto[]>>(
        `/ResultCards/student/${studentId}`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch student result cards"
      );
    }
  }
);

export const getResultCardsByClassId = createAsyncThunk<
  ApiResponse<ResultCardDto[]>,
  string
>(
  "resultCards/getResultCardsByClassId",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.get<ApiResponse<ResultCardDto[]>>(
        `/ResultCards/class/${classId}`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch class result cards"
      );
    }
  }
);

export const createResultCard = createAsyncThunk<
  ApiResponse<ResultCardDto>,
  CreateResultCardDto,
  { rejectValue: string }
>(
  "resultCards/createResultCard",
  async (resultCardData, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.post<ApiResponse<ResultCardDto>>(
        "/ResultCards",
        resultCardData
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create result card"
      );
    }
  }
);

export const updateResultCard = createAsyncThunk<
  ApiResponse<ResultCardDto>,
  UpdateResultCardDto,
  { rejectValue: string }
>(
  "resultCards/updateResultCard",
  async (resultCardData, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.put<ApiResponse<ResultCardDto>>(
        "/ResultCards",
        resultCardData
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update result card"
      );
    }
  }
);

export const updateResultEntry = createAsyncThunk<
  ApiResponse<any>,
  UpdateResultEntryDto,
  { rejectValue: string }
>(
  "resultCards/updateResultEntry",
  async (resultEntryData, { rejectWithValue }) => {
    try {
      const response = await cms_base_api.put<ApiResponse<any>>(
        "/ResultCards/entry",
        resultEntryData
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update result entry"
      );
    }
  }
);

export const deleteResultCard = createAsyncThunk<string, string>(
  "resultCards/deleteResultCard",
  async (resultCardId, { rejectWithValue }) => {
    try {
      await cms_base_api.delete(`/ResultCards/${resultCardId}`);
      return resultCardId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete result card"
      );
    }
  }
);

export const deleteResultEntry = createAsyncThunk<string, string>(
  "resultCards/deleteResultEntry",
  async (resultEntryId, { rejectWithValue }) => {
    try {
      await cms_base_api.delete(`/ResultCards/entry/${resultEntryId}`);
      return resultEntryId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete result entry"
      );
    }
  }
);
