import { Box, Grid, Typography } from "@mui/material";
import ClassesGrid from "../../components/app-settings-components/class-grid";
import SectionsGrid from "../../components/app-settings-components/sections-grid";
import FeeTypesGrid from "../../components/app-settings-components/fee-type-grid";

export default function AppSettings() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        background: "linear-gradient(135deg, #f8fafc 0%, #e3f2fd 100%)",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 800,
          letterSpacing: 1,
          color: "primary.main",
          mb: 4,
          textShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        School Settings
      </Typography>
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
