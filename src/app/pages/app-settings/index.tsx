import { useState } from "react";
import { Box, Grid, Typography, Button, Paper, Chip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CheckCircle, Settings, TrendingUp, Shield } from "lucide-react";
import ClassesGrid from "../../components/app-settings-components/class-grid";
import SectionsGrid from "../../components/app-settings-components/sections-grid";
import SubjectsGrid from "../../components/app-settings-components/subjects-grid";
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
        width: "100%",
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          background: "white",
          borderRadius: 3,
          p: 4,
          mb: 4,
          border: "1px solid #e0e7ff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
              }}
            >
              <Settings size={28} color="white" />
            </Box>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  mb: 0.5,
                }}
              >
                System Configuration
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                }}
              >
                Manage school settings and academic structure
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              icon={<Shield size={16} />}
              label="Administrator"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontWeight: 600,
                "& .MuiChip-icon": {
                  color: "white",
                },
              }}
            />
            {success ? (
              <Button
                variant="contained"
                startIcon={<CheckCircle size={20} />}
                sx={{
                  background:
                    "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                  color: "white",
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(17, 153, 142, 0.4)",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0f8a7d 0%, #2dd36f 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 25px rgba(17, 153, 142, 0.5)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Fee Generation Complete
              </Button>
            ) : (
              <LoadingButton
                variant="contained"
                loading={loading}
                onClick={handleTrigger}
                startIcon={<TrendingUp size={20} />}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 25px rgba(102, 126, 234, 0.5)",
                  },
                  "&:disabled": {
                    background:
                      "linear-gradient(135deg, #a0aec0 0%, #cbd5e0 100%)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Generate Monthly Fees
              </LoadingButton>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              background: "white",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                p: 2,
                color: "white",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Academic Classes
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Configure class levels and academic structure
              </Typography>
            </Box>
            <ClassesGrid />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              background: "white",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                p: 2,
                color: "white",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Class Sections
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Manage sections within each class level
              </Typography>
            </Box>
            <SectionsGrid />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              background: "white",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                p: 2,
                color: "white",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Class Subjects
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Define subjects for each class with codes
              </Typography>
            </Box>
            <SubjectsGrid />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              background: "white",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #e0e7ff",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                p: 2,
                color: "white",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Fee Structure
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Define fee types and pricing categories
              </Typography>
            </Box>
            <FeeTypesGrid />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
