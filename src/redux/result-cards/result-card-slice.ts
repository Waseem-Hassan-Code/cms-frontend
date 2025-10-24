import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ResultCardDto } from "../../models/school-settings";
import {
  getAllResultCards,
  getResultCardById,
  getResultCardsByStudentId,
  getResultCardsByClassId,
  createResultCard,
  updateResultCard,
  updateResultEntry,
  deleteResultCard,
  deleteResultEntry,
} from "./result-card-thunk";

interface ResultCardsState {
  resultCards: ResultCardDto[];
  studentResultCards: ResultCardDto[];
  classResultCards: ResultCardDto[];
  currentResultCard: ResultCardDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResultCardsState = {
  resultCards: [],
  studentResultCards: [],
  classResultCards: [],
  currentResultCard: null,
  loading: false,
  error: null,
};

const resultCardsSlice = createSlice({
  name: "resultCards",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentResultCard: (state) => {
      state.currentResultCard = null;
    },
    clearStudentResultCards: (state) => {
      state.studentResultCards = [];
    },
    clearClassResultCards: (state) => {
      state.classResultCards = [];
    },
  },
  extraReducers: (builder) => {
    // GET ALL RESULT CARDS
    builder
      .addCase(getAllResultCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllResultCards.fulfilled,
        (state, action: PayloadAction<{ data: ResultCardDto[] }>) => {
          state.loading = false;
          state.resultCards = action.payload.data;
        }
      )
      .addCase(getAllResultCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GET RESULT CARD BY ID
    builder
      .addCase(getResultCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getResultCardById.fulfilled,
        (state, action: PayloadAction<{ data: ResultCardDto }>) => {
          state.loading = false;
          state.currentResultCard = action.payload.data;
        }
      )
      .addCase(getResultCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GET RESULT CARDS BY STUDENT ID
    builder
      .addCase(getResultCardsByStudentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getResultCardsByStudentId.fulfilled,
        (state, action: PayloadAction<{ data: ResultCardDto[] }>) => {
          state.loading = false;
          state.studentResultCards = action.payload.data;
        }
      )
      .addCase(getResultCardsByStudentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GET RESULT CARDS BY CLASS ID
    builder
      .addCase(getResultCardsByClassId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getResultCardsByClassId.fulfilled,
        (state, action: PayloadAction<{ data: ResultCardDto[] }>) => {
          state.loading = false;
          state.classResultCards = action.payload.data;
        }
      )
      .addCase(getResultCardsByClassId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // CREATE RESULT CARD
    builder
      .addCase(createResultCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createResultCard.fulfilled,
        (state, action: PayloadAction<{ data: ResultCardDto }>) => {
          state.loading = false;
          state.resultCards.push(action.payload.data);
          state.studentResultCards.push(action.payload.data);
        }
      )
      .addCase(createResultCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE RESULT CARD
    builder
      .addCase(updateResultCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateResultCard.fulfilled,
        (state, action: PayloadAction<{ data: ResultCardDto }>) => {
          state.loading = false;
          const updatedCard = action.payload.data;

          // Update in resultCards array
          const cardIndex = state.resultCards.findIndex(
            (c) => c.id === updatedCard.id
          );
          if (cardIndex !== -1) {
            state.resultCards[cardIndex] = updatedCard;
          }

          // Update in studentResultCards array
          const studentCardIndex = state.studentResultCards.findIndex(
            (c) => c.id === updatedCard.id
          );
          if (studentCardIndex !== -1) {
            state.studentResultCards[studentCardIndex] = updatedCard;
          }

          // Update current result card
          if (state.currentResultCard?.id === updatedCard.id) {
            state.currentResultCard = updatedCard;
          }
        }
      )
      .addCase(updateResultCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE RESULT ENTRY
    builder
      .addCase(updateResultEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResultEntry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateResultEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE RESULT CARD
    builder
      .addCase(deleteResultCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteResultCard.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          const cardId = action.payload;
          state.resultCards = state.resultCards.filter((c) => c.id !== cardId);
          state.studentResultCards = state.studentResultCards.filter(
            (c) => c.id !== cardId
          );
          if (state.currentResultCard?.id === cardId) {
            state.currentResultCard = null;
          }
        }
      )
      .addCase(deleteResultCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE RESULT ENTRY
    builder
      .addCase(deleteResultEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResultEntry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteResultEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearCurrentResultCard,
  clearStudentResultCards,
  clearClassResultCards,
} = resultCardsSlice.actions;
export default resultCardsSlice.reducer;
