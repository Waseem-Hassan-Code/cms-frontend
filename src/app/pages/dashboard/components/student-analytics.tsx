import React from "react";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";

interface ClassStatsProps {
  className: string;
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  attendance: number;
  feeCollection: number;
}

const ClassStatsCard: React.FC<ClassStatsProps> = ({
  className,
  totalStudents,
  maleStudents,
  femaleStudents,
  attendance,
  feeCollection,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.05
        )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6" fontWeight={700} color="primary">
          Class {className}
        </Typography>
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 40,
            height: 40,
          }}
        >
          <SchoolIcon />
        </Avatar>
      </Box>

      <Box display="flex" gap={1} mb={2}>
        <Chip
          icon={<GroupIcon />}
          label={`${totalStudents} Total`}
          size="small"
          variant="outlined"
          color="primary"
        />
        <Chip
          icon={<PersonIcon />}
          label={`${maleStudents}M / ${femaleStudents}F`}
          size="small"
          variant="outlined"
          color="secondary"
        />
      </Box>

      <Box mb={2}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">
            Attendance Rate
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {attendance}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={attendance}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.success.main, 0.2),
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              backgroundColor:
                attendance >= 90
                  ? theme.palette.success.main
                  : attendance >= 75
                  ? theme.palette.warning.main
                  : theme.palette.error.main,
            },
          }}
        />
      </Box>

      <Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">
            Fee Collection
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {feeCollection}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={feeCollection}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.info.main, 0.2),
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              backgroundColor:
                feeCollection >= 90
                  ? theme.palette.success.main
                  : feeCollection >= 75
                  ? theme.palette.warning.main
                  : theme.palette.error.main,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

const EnrollmentTrends: React.FC = () => {
  const theme = useTheme();

  const enrollmentData = [
    { year: "2020", students: 980, growth: 0 },
    { year: "2021", students: 1045, growth: 6.6 },
    { year: "2022", students: 1156, growth: 10.6 },
    { year: "2023", students: 1203, growth: 4.1 },
    { year: "2024", students: 1247, growth: 3.7 },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Enrollment Trends (5 Years)
      </Typography>
      <Box sx={{ mt: 3 }}>
        {enrollmentData.map((data, index) => {
          const barWidth = (data.students / 1300) * 100; // Max scale
          return (
            <Box key={index} mb={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="body2" fontWeight={500}>
                  {data.year}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" fontWeight={600}>
                    {data.students} students
                  </Typography>
                  {data.growth > 0 && (
                    <Chip
                      icon={<TrendingUpIcon />}
                      label={`+${data.growth}%`}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: 12,
                  backgroundColor: alpha(theme.palette.grey[300], 0.3),
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${barWidth}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    transition: "width 1s ease-in-out",
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

const StudentAnalytics: React.FC = () => {
  const classesData = [
    {
      className: "1-A",
      totalStudents: 32,
      maleStudents: 18,
      femaleStudents: 14,
      attendance: 94,
      feeCollection: 88,
    },
    {
      className: "2-B",
      totalStudents: 30,
      maleStudents: 16,
      femaleStudents: 14,
      attendance: 91,
      feeCollection: 92,
    },
    {
      className: "3-A",
      totalStudents: 28,
      maleStudents: 15,
      femaleStudents: 13,
      attendance: 96,
      feeCollection: 85,
    },
    {
      className: "4-C",
      totalStudents: 35,
      maleStudents: 20,
      femaleStudents: 15,
      attendance: 89,
      feeCollection: 94,
    },
    {
      className: "5-A",
      totalStudents: 33,
      maleStudents: 17,
      femaleStudents: 16,
      attendance: 93,
      feeCollection: 87,
    },
    {
      className: "6-B",
      totalStudents: 29,
      maleStudents: 14,
      femaleStudents: 15,
      attendance: 88,
      feeCollection: 91,
    },
  ];

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        fontWeight={600}
        color="text.primary"
      >
        Student Analytics
      </Typography>

      {/* Enrollment Trends */}
      <Box mb={4}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <EnrollmentTrends />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
                background: "linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)",
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Quick Stats
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="body2">Average Class Size</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary">
                    31
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="body2">Gender Ratio (M:F)</Typography>
                  <Typography variant="h6" fontWeight={700} color="secondary">
                    52:48
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="body2">Overall Attendance</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckIcon color="success" fontSize="small" />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="success.main"
                    >
                      91.8%
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2">Fee Collection Rate</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckIcon color="success" fontSize="small" />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="success.main"
                    >
                      89.5%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Class-wise Statistics */}
      <Typography
        variant="h6"
        gutterBottom
        fontWeight={600}
        color="text.primary"
      >
        Class-wise Performance
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {classesData.map((classData, index) => (
          <Box key={index}>
            <ClassStatsCard {...classData} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StudentAnalytics;
