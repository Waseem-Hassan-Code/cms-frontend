import {
  Button,
  Container,
  Paper,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StudentFeePanel from "./student-fee";
import StudentEvaluationPanel from "./student-evaluation";
import StudentExamResultsPanel from "./student-result";
import StudentBasicInfo from "./student-basic-info";
import type { StudentDetailsDto } from "../../../../models/enrolled-students";
import { mapStudentDetailsToBasicInfo } from "../type-hooks/hooks";

interface StudentDetailProps {
  student: StudentDetailsDto | null;
  onBack: () => void;
  isLoading: boolean;
}

const StudentDetail = ({ student, onBack, isLoading }: StudentDetailProps) => {
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
        {isLoading ? (
          <>
            <Skeleton variant="text" width="50%" height={40} sx={{ mb: 2 }} />
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ borderRadius: 2 }}
            />
          </>
        ) : student ? (
          <StudentBasicInfo student={mapStudentDetailsToBasicInfo(student)} />
        ) : (
          <Typography color="text.secondary">No student data found.</Typography>
        )}
      </Paper>

      <Grid container spacing={3}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Skeleton
                  variant="text"
                  width="80%"
                  height={30}
                  sx={{ mb: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  height={120}
                  sx={{ borderRadius: 2 }}
                />
              </Paper>
            </Grid>
          ))
        ) : student ? (
          <>
            <Grid size={{ xs: 12, md: 4 }}>
              <StudentFeePanel
                studentId={student.id}
                fee={student.studentFeeInfo}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StudentEvaluationPanel studentId={student.id} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StudentExamResultsPanel studentId={student.id} />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Container>
  );
};

export default StudentDetail;
