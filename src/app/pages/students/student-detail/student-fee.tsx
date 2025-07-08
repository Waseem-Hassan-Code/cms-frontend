// src/pages/students/components/StudentFeePanel.tsx
import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";

interface StudentFeePanelProps {
  studentId: string;
}

const StudentFeePanel = ({ studentId }: StudentFeePanelProps) => {
  // In a real app, you would fetch fee data based on studentId
  const feeData = {
    totalFee: 12000,
    paid: 8000,
    due: 4000,
    lastPayment: "2023-05-15",
    status: "Partially Paid",
  };

  return (
    <Paper elevation={2} sx={{ p: 2, height: "100%", borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <PaymentsIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="h3">
          Fee Information
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Total Fee: ₹{feeData.totalFee}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Paid: ₹{feeData.paid}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Due: ₹{feeData.due}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Last Payment: {feeData.lastPayment}
        </Typography>
        <Typography
          variant="body2"
          color={feeData.status === "Paid" ? "success.main" : "warning.main"}
        >
          Status: {feeData.status}
        </Typography>
      </Box>

      <Button variant="outlined" size="small" fullWidth>
        View Fee Details
      </Button>
    </Paper>
  );
};

export default StudentFeePanel;
