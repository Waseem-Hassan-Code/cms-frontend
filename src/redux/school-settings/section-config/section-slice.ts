import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SectionsDto } from "../../../models/school-settings";
import { addSection, deleteSection, getSections } from "./section-thunk";

interface SectionsState {
  sections: SectionsDto[];
  loading: boolean;
  error: string | null;
}

const initialState: SectionsState = {
  sections: [],
  loading: false,
  error: null,
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET SECTIONS
    builder
      .addCase(getSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSections.fulfilled,
        (state, action: PayloadAction<{ data: SectionsDto[] }>) => {
          state.loading = false;
          state.sections = action.payload.data;
        }
      )
      .addCase(getSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ADD SECTION
    builder
      .addCase(addSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addSection.fulfilled,
        (state, action: PayloadAction<{ data: SectionsDto }>) => {
          state.loading = false;
          state.sections.push(action.payload.data);
        }
      )
      .addCase(addSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE SECTION
    builder
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSection.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.sections = state.sections.filter(
            (section) => (section as any).id !== action.payload
          );
        }
      )
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sectionsSlice.reducer;
