// src/pages/students/components/StudentFeePanel.tsx
import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";

interface StudentFeePanelProps {
  studentId: string;
}

const StudentFeePanel = ({ studentId }: StudentFeePanelProps) => {
  const feeData = {
    totalFee: 12000,
    paid: 8000,
    due: 4000,
    lastPayment: "2023-05-15",
    status: "Partially Paid",
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        pb: 2, // ensure padding at bottom
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
          <PaymentsIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h3">
            Fee Information
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Total Fee:{" "}
            <Typography component="span" fontWeight="bold">
              PKR {feeData.totalFee}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discounted Amount:{" "}
            <Typography component="span" fontWeight="bold" color="info.main">
              PKR {feeData.totalFee}
            </Typography>
          </Typography>
          <Typography variant="body2">
            Paid:{" "}
            <Typography component="span" fontWeight="bold" color="success.main">
              PKR {feeData.paid}
            </Typography>
          </Typography>
          <Typography variant="body2">
            Due:{" "}
            <Typography component="span" fontWeight="bold" color="error.main">
              PKR {feeData.due}
            </Typography>
          </Typography>
        </Box>

        <Box>
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
      </Box>

      {/* Bottom button pinned with spacing */}
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" size="small" fullWidth sx={{ mb: 0 }}>
          View Fee Details
        </Button>
      </Box>
    </Paper>
  );
};

export default StudentFeePanel;
