import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SubjectDto } from "../../../models/school-settings";
import {
  addSubject,
  deleteSubject,
  getSubjects,
  getAllSubjects,
  getSubjectById,
  updateSubject,
} from "./subject-thunk";

interface SubjectsState {
  subjects: SubjectDto[];
  allSubjects: SubjectDto[];
  currentSubject: SubjectDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubjectsState = {
  subjects: [],
  allSubjects: [],
  currentSubject: null,
  loading: false,
  error: null,
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSubject: (state) => {
      state.currentSubject = null;
    },
  },
  extraReducers: (builder) => {
    // GET SUBJECTS BY CLASS
    builder
      .addCase(getSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSubjects.fulfilled,
        (state, action: PayloadAction<{ data: SubjectDto[] }>) => {
          state.loading = false;
          state.subjects = action.payload.data;
        }
      )
      .addCase(getSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GET ALL SUBJECTS
    builder
      .addCase(getAllSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllSubjects.fulfilled,
        (state, action: PayloadAction<{ data: SubjectDto[] }>) => {
          state.loading = false;
          state.allSubjects = action.payload.data;
        }
      )
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GET SUBJECT BY ID
    builder
      .addCase(getSubjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSubjectById.fulfilled,
        (state, action: PayloadAction<{ data: SubjectDto }>) => {
          state.loading = false;
          state.currentSubject = action.payload.data;
        }
      )
      .addCase(getSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ADD SUBJECT
    builder
      .addCase(addSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addSubject.fulfilled,
        (state, action: PayloadAction<{ data: SubjectDto }>) => {
          state.loading = false;
          state.subjects.push(action.payload.data);
          state.allSubjects.push(action.payload.data);
        }
      )
      .addCase(addSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE SUBJECT
    builder
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSubject.fulfilled,
        (state, action: PayloadAction<{ data: SubjectDto }>) => {
          state.loading = false;
          const updatedSubject = action.payload.data;

          // Update in subjects array
          const subjectIndex = state.subjects.findIndex(
            (s) => s.id === updatedSubject.id
          );
          if (subjectIndex !== -1) {
            state.subjects[subjectIndex] = updatedSubject;
          }

          // Update in allSubjects array
          const allSubjectIndex = state.allSubjects.findIndex(
            (s) => s.id === updatedSubject.id
          );
          if (allSubjectIndex !== -1) {
            state.allSubjects[allSubjectIndex] = updatedSubject;
          }
        }
      )
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE SUBJECT
    builder
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSubject.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          const subjectId = action.payload;
          state.subjects = state.subjects.filter((s) => s.id !== subjectId);
          state.allSubjects = state.allSubjects.filter(
            (s) => s.id !== subjectId
          );
        }
      )
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentSubject } = subjectsSlice.actions;
export default subjectsSlice.reducer;
