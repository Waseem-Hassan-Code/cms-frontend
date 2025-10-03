import React from "react";
import { Paper, Typography, Box, Button, Avatar, alpha } from "@mui/material";
import {
  PersonAdd as AddStudentIcon,
  Assessment as ReportsIcon,
  Payment as PaymentIcon,
  School as ClassIcon,
  Event as EventIcon,
  Notifications as NotificationIcon,
  FileDownload as ExportIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path?: string;
  onClick?: () => void;
}

const QuickActionCard: React.FC<QuickActionProps> = ({
  title,
  description,
  icon,
  color,
  path,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        p: 0,
        borderRadius: 3,
        textTransform: "none",
        width: "100%",
        height: "100%",
        minHeight: 120,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3,
          width: "100%",
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
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Avatar
            sx={{
              bgcolor: color,
              width: 48,
              height: 48,
              mb: 2,
              boxShadow: `0 4px 14px ${alpha(color, 0.4)}`,
            }}
          >
            {icon}
          </Avatar>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="text.primary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1.4 }}
          >
            {description}
          </Typography>
        </Box>
      </Paper>
    </Button>
  );
};

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: "Add Student",
      description: "Register new student admission",
      icon: <AddStudentIcon />,
      color: "#1976d2",
      path: "/student-admissions",
    },
    {
      title: "View Reports",
      description: "Generate financial & academic reports",
      icon: <ReportsIcon />,
      color: "#2e7d32",
      onClick: () => alert("Reports feature coming soon!"),
    },
    {
      title: "Fee Collection",
      description: "Manage student fee payments",
      icon: <PaymentIcon />,
      color: "#ed6c02",
      path: "/students",
    },
    {
      title: "Manage Classes",
      description: "Create and organize classes",
      icon: <ClassIcon />,
      color: "#0288d1",
      path: "/classes",
    },
    {
      title: "Schedule Event",
      description: "Add school events & activities",
      icon: <EventIcon />,
      color: "#9c27b0",
      onClick: () => alert("Events feature coming soon!"),
    },
    {
      title: "Send Notice",
      description: "Broadcast announcements",
      icon: <NotificationIcon />,
      color: "#9C27B0",
      onClick: () => alert("Notice feature coming soon!"),
    },
    {
      title: "Export Data",
      description: "Download student & financial data",
      icon: <ExportIcon />,
      color: "#607D8B",
      onClick: () => alert("Export feature coming soon!"),
    },
    {
      title: "Settings",
      description: "Configure school settings",
      icon: <SettingsIcon />,
      color: "#795548",
      path: "/app-settings",
    },
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
        Quick Actions
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Common tasks and shortcuts
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {actions.map((action, index) => (
          <Box key={index}>
            <QuickActionCard {...action} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default QuickActions;
