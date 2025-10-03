// src/pages/admissions/AdmissionPage.tsx
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AdmissionGrid from "./admission-grid";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { clearStudentId } from "../../../redux/student-admission/student-admission-slice";
import AdmissionForm from "./admission-form/admission-form";

const AdmissionPage = () => {
  const [openForm, setOpenForm] = useState(false);

  const { studentId } = useSelector(
    (state: RootState) => state.studentAdmission
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (studentId) {
      setOpenForm(true);
    }
  }, [studentId]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Student Admissions
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
          sx={{ px: 3, py: 1.5 }}
        >
          Admit New Student
        </Button>
      </Box>

      {!openForm ? (
        <AdmissionGrid />
      ) : (
        <AdmissionForm
          onClose={() => {
            setOpenForm(false);
            if (studentId) {
              dispatch(clearStudentId());
            }
          }}
        />
      )}
    </Box>
  );
};

export default AdmissionPage;
