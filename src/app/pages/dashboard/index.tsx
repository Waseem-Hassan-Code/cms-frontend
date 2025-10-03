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
import DashboardOverview from "./components/dashboard-overview";
import QuickActions from "./components/quick-actions";
import RecentActivities from "./components/recent-activities";
import FinancialDashboard from "./components/financial-dashboard";
import StudentAnalytics from "./components/student-analytics";

// Import dashboard components

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    "aria-controls": `dashboard-tabpanel-${index}`,
  };
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          School Management Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back! Here's what's happening at your school today.
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Paper
        elevation={2}
        sx={{
          mb: 3,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05
          )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              minHeight: 72,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              px: 3,
            },
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: "3px 3px 0 0",
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
      </Paper>

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
    </Box>
  );
};

export default Dashboard;
