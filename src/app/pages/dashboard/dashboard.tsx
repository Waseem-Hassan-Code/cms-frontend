import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assessment as AnalyticsIcon,
  AccountBalance as FinanceIcon,
  School as StudentsIcon,
  Notifications as ActivityIcon,
} from "@mui/icons-material";

// Import dashboard components
import DashboardOverview from "./components/dashboard-overview";
import FinancialDashboard from "./components/financial-dashboard";
import StudentAnalytics from "./components/student-analytics";
import QuickActions from "./components/quick-actions";
import RecentActivities from "./components/recent-activities";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    "aria-controls": `dashboard-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const _handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Section */}
      <Box mb={3}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={700}
          sx={{
            background: "linear-gradient(45deg, #1976d2, #42a5f5)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          School Management Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive overview of your school's performance, finances, and
          activities
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={_handleTabChange}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                minHeight: 64,
                fontWeight: 600,
                fontSize: "0.95rem",
                textTransform: "none",
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <Tab
              icon={<DashboardIcon />}
              label="Overview"
              iconPosition="start"
              {...a11yProps(0)}
            />
            <Tab
              icon={<FinanceIcon />}
              label="Financial"
              iconPosition="start"
              {...a11yProps(1)}
            />
            <Tab
              icon={<StudentsIcon />}
              label="Students"
              iconPosition="start"
              {...a11yProps(2)}
            />
            <Tab
              icon={<AnalyticsIcon />}
              label="Analytics"
              iconPosition="start"
              {...a11yProps(3)}
            />
            <Tab
              icon={<ActivityIcon />}
              label="Activities"
              iconPosition="start"
              {...a11yProps(4)}
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Overview Cards */}
            <Box sx={{ width: "100%" }}>
              <DashboardOverview />
            </Box>

            {/* Quick Actions and Recent Activities */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <QuickActions />
              </Box>
              <Box sx={{ flex: 1 }}>
                <RecentActivities />
              </Box>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <FinancialDashboard />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <StudentAnalytics />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <StudentAnalytics />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FinancialDashboard />
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <RecentActivities />
        </TabPanel>
      </Paper>
    </Box>
  );
}
