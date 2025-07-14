// src/pages/admissions/AdmissionPage.tsx
import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import AdmissionGrid from "./admission-grid";
import AdmissionForm from "./admission-form/admission-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { clearStudentId } from "../../../redux/student-admission/student-admission-slice";

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
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
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
    </Container>
  );
};

export default AdmissionPage;
