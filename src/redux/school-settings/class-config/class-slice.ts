import { createSlice } from "@reduxjs/toolkit";
import type { ClassItem } from "../../../models/school-settings";
import { addClass, deleteClass, getClasses } from "./class-thunk";

interface ClassState {
  schoolClasses: ClassItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  schoolClasses: [],
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: "schoolSettings",
  initialState,
  reducers: {
    clearClassError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Classes
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolClasses = action.payload.data || [];
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Class
      .addCase(addClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.schoolClasses.push(action.payload.data);
        }
      })
      .addCase(addClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Class
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload?.data?.id;
        if (id) {
          state.schoolClasses = state.schoolClasses.filter((c) => c.id !== id);
        }
      })

      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearClassError } = classSlice.actions;
export default classSlice.reducer;
