import React from "react";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import {
  PersonAdd as NewStudentIcon,
  Payment as PaymentIcon,
  School as ClassIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";

interface Activity {
  id: string;
  type:
    | "admission"
    | "payment"
    | "class"
    | "event"
    | "assignment"
    | "notification";
  title: string;
  description: string;
  time: string;
  user?: string;
  amount?: string;
  status?: "completed" | "pending" | "failed";
}

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (activity.type) {
      case "admission":
        return <NewStudentIcon />;
      case "payment":
        return <PaymentIcon />;
      case "class":
        return <ClassIcon />;
      case "event":
        return <EventIcon />;
      case "assignment":
        return <AssignmentIcon />;
      case "notification":
        return <NotificationIcon />;
      default:
        return <NotificationIcon />;
    }
  };

  const getColor = () => {
    switch (activity.type) {
      case "admission":
        return theme.palette.primary.main;
      case "payment":
        return theme.palette.success.main;
      case "class":
        return theme.palette.info.main;
      case "event":
        return theme.palette.warning.main;
      case "assignment":
        return theme.palette.secondary.main;
      case "notification":
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return theme.palette.success.main;
      case "pending":
        return theme.palette.warning.main;
      case "failed":
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="flex-start" gap={2} py={2}>
        <Avatar
          sx={{
            bgcolor: alpha(getColor(), 0.1),
            color: getColor(),
            width: 40,
            height: 40,
          }}
        >
          {getIcon()}
        </Avatar>
        <Box flex={1} minWidth={0}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={0.5}
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="text.primary"
            >
              {activity.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {activity.time}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {activity.description}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            {activity.user && (
              <Chip
                label={activity.user}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem", height: 24 }}
              />
            )}
            {activity.amount && (
              <Chip
                label={activity.amount}
                size="small"
                color="success"
                variant="outlined"
                sx={{ fontSize: "0.7rem", height: 24 }}
              />
            )}
            {activity.status && (
              <Chip
                label={activity.status}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  height: 24,
                  backgroundColor: alpha(getStatusColor(activity.status), 0.1),
                  color: getStatusColor(activity.status),
                  border: `1px solid ${alpha(
                    getStatusColor(activity.status),
                    0.3
                  )}`,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const RecentActivities: React.FC = () => {
  const activities: Activity[] = [
    {
      id: "1",
      type: "admission",
      title: "New Student Admission",
      description: "Sarah Johnson enrolled in Class 8-A",
      time: "2 minutes ago",
      user: "Admin",
      status: "completed",
    },
    {
      id: "2",
      type: "payment",
      title: "Fee Payment Received",
      description: "Monthly tuition fee paid by John Smith",
      time: "15 minutes ago",
      user: "John Smith",
      amount: "$450",
      status: "completed",
    },
    {
      id: "3",
      type: "class",
      title: "New Class Created",
      description: "Advanced Mathematics class added for Grade 10",
      time: "1 hour ago",
      user: "Dr. Wilson",
      status: "completed",
    },
    {
      id: "4",
      type: "event",
      title: "Event Scheduled",
      description: "Annual Sports Day scheduled for next Friday",
      time: "2 hours ago",
      user: "Event Coordinator",
      status: "pending",
    },
    {
      id: "5",
      type: "payment",
      title: "Payment Reminder Sent",
      description: "Fee reminder sent to 45 students",
      time: "3 hours ago",
      user: "System",
      status: "completed",
    },
    {
      id: "6",
      type: "assignment",
      title: "Assignment Submitted",
      description: "Mathematics homework submitted by Class 9-B",
      time: "4 hours ago",
      user: "Ms. Davis",
      status: "completed",
    },
    {
      id: "7",
      type: "notification",
      title: "Important Notice",
      description: "School will remain closed on Monday due to holiday",
      time: "5 hours ago",
      user: "Principal",
      status: "completed",
    },
    {
      id: "8",
      type: "payment",
      title: "Payment Failed",
      description: "Online payment failed for Emma Watson",
      time: "6 hours ago",
      user: "Emma Watson",
      amount: "$380",
      status: "failed",
    },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        height: "100%",
        maxHeight: 600,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box p={3} pb={1}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Recent Activities
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Latest updates and notifications
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          px: 3,
          pb: 3,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha("#000", 0.2),
            borderRadius: 3,
          },
        }}
      >
        {activities.map((activity, index) => (
          <Box key={activity.id}>
            <ActivityItem activity={activity} />
            {index < activities.length - 1 && <Divider sx={{ ml: 6 }} />}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default RecentActivities;
