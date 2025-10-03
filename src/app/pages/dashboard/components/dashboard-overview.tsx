import React from "react";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  LinearProgress,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  People as StudentsIcon,
  AttachMoney as RevenueIcon,
  School as ClassesIcon,
  PersonAdd as NewStudentsIcon,
  TrendingUp as GrowthIcon,
  Payment as PaymentsIcon,
  Group as TeachersIcon,
  EventNote as EventsIcon,
} from "@mui/icons-material";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  progress?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  color,
  subtitle,
  progress,
}) => {
  const theme = useTheme();

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return theme.palette.success.main;
      case "negative":
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(
          color,
          0.05
        )} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 25px ${alpha(color, 0.3)}`,
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Avatar
          sx={{
            bgcolor: color,
            width: 56,
            height: 56,
            boxShadow: `0 4px 14px ${alpha(color, 0.4)}`,
          }}
        >
          {icon}
        </Avatar>
        {change && (
          <Chip
            label={change}
            size="small"
            sx={{
              backgroundColor: alpha(getChangeColor(), 0.1),
              color: getChangeColor(),
              fontWeight: 600,
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        )}
      </Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        color="text.primary"
        gutterBottom
      >
        {value}
      </Typography>

      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={0.5}
        >
          {subtitle}
        </Typography>
      )}

      {progress !== undefined && (
        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: alpha(color, 0.2),
              "& .MuiLinearProgress-bar": {
                backgroundColor: color,
                borderRadius: 3,
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, display: "block" }}
          >
            {progress}% of target
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

const DashboardOverview: React.FC = () => {
  const theme = useTheme();

  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <StudentsIcon />,
      color: theme.palette.primary.main,
      subtitle: "Active enrollments",
    },
    {
      title: "Monthly Revenue",
      value: "$45,670",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: <RevenueIcon />,
      color: theme.palette.success.main,
      subtitle: "Fee collections",
      progress: 78,
    },
    {
      title: "Total Classes",
      value: "24",
      change: "+2",
      changeType: "positive" as const,
      icon: <ClassesIcon />,
      color: theme.palette.info.main,
      subtitle: "Active classes",
    },
    {
      title: "New Admissions",
      value: "89",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: <NewStudentsIcon />,
      color: theme.palette.warning.main,
      subtitle: "This month",
    },
    {
      title: "Teachers",
      value: "56",
      change: "+3",
      changeType: "positive" as const,
      icon: <TeachersIcon />,
      color: theme.palette.secondary.main,
      subtitle: "Active faculty",
    },
    {
      title: "Pending Payments",
      value: "$12,340",
      change: "-5.1%",
      changeType: "negative" as const,
      icon: <PaymentsIcon />,
      color: theme.palette.error.main,
      subtitle: "Outstanding fees",
      progress: 35,
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: <GrowthIcon />,
      color: "#9C27B0",
      subtitle: "Average this week",
      progress: 94,
    },
    {
      title: "Upcoming Events",
      value: "7",
      icon: <EventsIcon />,
      color: "#FF9800",
      subtitle: "Next 30 days",
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
        School Overview
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {stats.map((stat, index) => (
          <Box key={index}>
            <StatCard {...stat} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardOverview;
