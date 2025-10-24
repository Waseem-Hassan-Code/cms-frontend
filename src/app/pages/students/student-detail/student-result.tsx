import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResultCardsByStudentId } from "../../../../redux/result-cards/result-card-thunk";
import type { RootState, AppDispatch } from "../../../../redux/store";
import type { ResultCardDto } from "../../../../models/school-settings";

interface StudentExamResultsProps {
  studentId: string;
}
export default function StudentExamResultsPanel({
  studentId,
}: StudentExamResultsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { resultCards, loading } = useSelector(
    (state: RootState) => state.resultCards
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      dispatch(getResultCardsByStudentId(studentId));
    }
  }, [dispatch, studentId]);

  // Calculate summary from actual result cards
  const calculateSummary = () => {
    if (resultCards.length === 0) {
      return {
        totalExams: 0,
        passedExams: 0,
        failedExams: 0,
        averagePercentage: 0,
        resultStatus: "No Data",
        lastExamDate: "N/A",
      };
    }

    const totalExams = resultCards.length;
    const passedExams = resultCards.filter(
      (card: ResultCardDto) => card.percentage >= 40
    ).length;
    const failedExams = totalExams - passedExams;
    const averagePercentage =
      resultCards.reduce(
        (sum: number, card: ResultCardDto) => sum + card.percentage,
        0
      ) / totalExams;
    const lastExamDate =
      resultCards.length > 0
        ? new Date(
            Math.max(
              ...resultCards.map((card: ResultCardDto) =>
                new Date(card.examDate).getTime()
              )
            )
          ).toLocaleDateString()
        : "N/A";

    return {
      totalExams,
      passedExams,
      failedExams,
      averagePercentage: Math.round(averagePercentage * 10) / 10,
      resultStatus: averagePercentage >= 40 ? "Pass" : "Fail",
      lastExamDate,
    };
  };

  const examResults = calculateSummary();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        pb: 2,
        height: "100%",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top content */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <BarChartIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h3">
            Exam Results Summary
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
          >
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Total Exams: {examResults.totalExams}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Passed: {examResults.passedExams}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Failed: {examResults.failedExams}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last Exam: {examResults.lastExamDate}
            </Typography>
          </Box>
        )}

        <Box>
          <Typography variant="body2" color="text.secondary">
            Average: {examResults.averagePercentage}%
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
          onClick={() => navigate(`/students/${studentId}/report-card`)}
        >
          View Detailed Report
        </Button>
      </Box>
    </Paper>
  );
}
