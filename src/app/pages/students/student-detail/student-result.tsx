import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function StudentExamResultsPanel() {
  const examResults = {
    totalSubjects: 6,
    passedSubjects: 5,
    failedSubjects: 1,
    percentage: 78.5,
    resultStatus: "Pass",
    lastExamDate: "2024-12-18",
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        pb: 2, // 2px padding from bottom
        height: "100%",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // This ensures button sticks at the bottom
      }}
    >
      {/* Top content */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <BarChartIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h3">
            Exam Results
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Total Subjects: {examResults.totalSubjects}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Passed: {examResults.passedSubjects}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Failed: {examResults.failedSubjects}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Exam Date: {examResults.lastExamDate}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            Percentage: {examResults.percentage}%
          </Typography>
          <Typography
            variant="body2"
            color={
              examResults.resultStatus === "Pass"
                ? "success.main"
                : examResults.resultStatus === "Distinction"
                ? "info.main"
                : "error.main"
            }
          >
            Status: {examResults.resultStatus}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 0, pb: 0.25 }}
        >
          View Detailed Report
        </Button>
      </Box>
    </Paper>
  );
}
