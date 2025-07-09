// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import studentAdmissionSlice from "./student-admission/student-admission-slice";

export const store = configureStore({
  reducer: {
    studentAdmission: studentAdmissionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
