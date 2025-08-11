// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import studentAdmissionSlice from "./student-admission/student-admission-slice";
import feeDetailSlice from "./fee-details/fee-detail-slice";

export const store = configureStore({
  reducer: {
    studentAdmission: studentAdmissionSlice,
    feeDetails: feeDetailSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
