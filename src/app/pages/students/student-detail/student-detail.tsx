import { Button, Paper, Grid, Typography, Skeleton, Box } from "@mui/material";
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
    <>
      <Box sx={{ width: "100%" }}>
        {/* Header with Back Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            p: 2,
            borderRadius: 2,
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            border: "1px solid #e2e8f0",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            variant="outlined"
            sx={{
              mr: 3,
              borderColor: "#3b82f6",
              color: "#3b82f6",
              "&:hover": {
                backgroundColor: "#3b82f6",
                color: "white",
              },
            }}
          >
            Back to Students
          </Button>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              flexGrow: 1,
            }}
          >
            Student Profile
          </Typography>
        </Box>

        {/* Student Basic Info Card */}
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
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
            <Typography color="text.secondary">
              No student data found.
            </Typography>
          )}
        </Paper>

        {/* Information Cards Grid */}
        <Grid container spacing={3}>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={40}
                    sx={{ mb: 2 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={140}
                    sx={{ borderRadius: 2 }}
                  />
                </Paper>
              </Grid>
            ))
          ) : student ? (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                    border: "1px solid #e0f2fe",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <StudentFeePanel
                    studentId={student.id}
                    fee={student.studentFeeInfo}
                  />
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
                    border: "1px solid #dcfce7",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <StudentEvaluationPanel studentId={student.id} />
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #fefce8 100%)",
                    border: "1px solid #fef3c7",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <StudentExamResultsPanel studentId={student.id} />
                </Paper>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Box>
    </>
  );
};

export default StudentDetail;
