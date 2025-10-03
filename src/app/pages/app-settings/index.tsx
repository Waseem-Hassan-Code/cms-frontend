import { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CheckCircle } from "lucide-react";
import ClassesGrid from "../../components/app-settings-components/class-grid";
import SectionsGrid from "../../components/app-settings-components/sections-grid";
import FeeTypesGrid from "../../components/app-settings-components/fee-type-grid";

export default function AppSettings() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTrigger = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      // simulate API call (replace with your API integration later)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (error) {
      console.error("Trigger failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        background: "linear-gradient(135deg, #f8fafc 0%, #e3f2fd 100%)",
        width: "100%",
      }}
    >
      {/* Title + Button Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Typography
          variant="h5" // smaller than h3
          sx={{
            fontWeight: 600, // less thick than 800
            letterSpacing: 0.5,
            color: "primary.main",
            textShadow: "0 2px 6px rgba(0,0,0,0.04)",
          }}
        >
          School Settings
        </Typography>

        {/* Stylish Button */}
        {success ? (
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircle />}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 128, 0, 0.3)",
            }}
          >
            Fee Triggered
          </Button>
        ) : (
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleTrigger}
            sx={{
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              color: "#fff",
              px: 3,
              py: 1,
              fontWeight: 600,
              borderRadius: "10px",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0, #1e88e5)",
              },
            }}
          >
            Trigger Monthly Fee
          </LoadingButton>
        )}
      </Box>

      {/* Main Grid */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <ClassesGrid />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SectionsGrid />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FeeTypesGrid />
        </Grid>
      </Grid>
    </Box>
  );
}
