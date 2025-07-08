import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function StudentEvaluationPanel() {
  const evaluationData = {
    averageGrade: "B+",
    attendance: "92%",
    remarks: "Consistent performance, needs improvement in math.",
    lastUpdated: "2023-06-20",
    status: "In Progress",
  };

  return (
    <Paper elevation={2} sx={{ p: 2, height: "100%", borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <AssessmentIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="h3">
          Student Evaluation
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Average Grade: {evaluationData.averageGrade}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Attendance: {evaluationData.attendance}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last Updated: {evaluationData.lastUpdated}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Remarks:
        </Typography>
        <Typography variant="body2" color="text.primary">
          {evaluationData.remarks}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        color={
          evaluationData.status === "Excellent"
            ? "success.main"
            : evaluationData.status === "Needs Improvement"
            ? "error.main"
            : "warning.main"
        }
        sx={{ mb: 2 }}
      >
        Status: {evaluationData.status}
      </Typography>

      <Button variant="outlined" size="small" fullWidth>
        View Full Report
      </Button>
    </Paper>
  );
}
