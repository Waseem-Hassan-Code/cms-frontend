// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import studentAdmissionSlice from "./student-admission/student-admission-slice";
import feeDetailSlice from "./fee-details/fee-detail-slice";
import classSlice from "./school-settings/class-config/class-slice";
import sectionSlice from "./school-settings/section-config/section-slice";
import feeSlice from "./school-settings/fee-config/fee-slice";
import enrolledStudentSlice from "./enrolled-students/enrolled-student-slice";
import applicationSettingSlice from "./settings/settings-slice";
import enrolledStudentsPendingFeeSlice from "./enrolled-students/fee-details/pending-fee-slice";

export const store = configureStore({
  reducer: {
    studentAdmission: studentAdmissionSlice,
    feeDetails: feeDetailSlice,
    classSettings: classSlice,
    sectionSettings: sectionSlice,
    feeSettings: feeSlice,
    enrolledStudents: enrolledStudentSlice,
    applicationSettings: applicationSettingSlice,
    enrolledStudentPendingFeeAndOtherDetails: enrolledStudentsPendingFeeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
