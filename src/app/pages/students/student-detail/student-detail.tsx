// src/pages/students/components/StudentDetail.tsx
import { Button, Container, Paper, Grid, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { Student } from "../type-hooks/type";
import StudentBasicInfo from "./student-basic-info";
import StudentFeePanel from "./student-fee";
import StudentEvaluationPanel from "./student-evaluation";
import StudentExamResultsPanel from "./student-result";

interface StudentDetailProps {
  student: Student;
  onBack: () => void;
}

const StudentDetail = ({ student, onBack }: StudentDetailProps) => {
  return (
    <Container maxWidth="xl">
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
        Back to Students
      </Button>

      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Student Details
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <StudentBasicInfo student={student} />
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StudentFeePanel  />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StudentEvaluationPanel />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StudentExamResultsPanel />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDetail;
