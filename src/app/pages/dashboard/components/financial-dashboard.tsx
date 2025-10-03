import React from "react";
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as MoneyIcon,
  CreditCard as CardIcon,
  Receipt as ReceiptIcon,
  AccountBalance as BankIcon,
} from "@mui/icons-material";

interface FinanceCardProps {
  title: string;
  amount: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
  color: string;
}

const FinanceCard: React.FC<FinanceCardProps> = ({
  title,
  amount,
  change,
  changeType,
  icon,
  color,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(
          color,
          0.05
        )} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 8px 25px ${alpha(color, 0.3)}`,
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Avatar
            sx={{
              bgcolor: color,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
          <Box textAlign="right">
            <Typography variant="h6" fontWeight="bold">
              {amount}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                color:
                  changeType === "positive"
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            >
              {changeType === "positive" ? (
                <TrendingUpIcon fontSize="small" />
              ) : (
                <TrendingDownIcon fontSize="small" />
              )}
              <Typography variant="caption" fontWeight={600} ml={0.5}>
                {change}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const RevenueChart: React.FC = () => {
  const theme = useTheme();

  const monthlyData = [
    { month: "Jan", revenue: 38000, target: 45000 },
    { month: "Feb", revenue: 42000, target: 45000 },
    { month: "Mar", revenue: 45670, target: 45000 },
    { month: "Apr", revenue: 38500, target: 45000 },
    { month: "May", revenue: 41200, target: 45000 },
    { month: "Jun", revenue: 43800, target: 45000 },
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
        Monthly Revenue Trend
      </Typography>
      <Box sx={{ mt: 3 }}>
        {monthlyData.map((data, index) => {
          const progress = (data.revenue / data.target) * 100;
          return (
            <Box key={index} mb={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" fontWeight={500}>
                  {data.month}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  ${data.revenue.toLocaleString()}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background:
                      progress >= 100
                        ? `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.success.light} 100%)`
                        : `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  },
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: "block" }}
              >
                Target: ${data.target.toLocaleString()} ({progress.toFixed(1)}%)
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

const FeeCollectionStatus: React.FC = () => {
  const feeCategories = [
    { category: "Tuition Fee", collected: 89, total: 100, amount: "$234,500" },
    { category: "Transport Fee", collected: 76, total: 100, amount: "$45,200" },
    {
      category: "Laboratory Fee",
      collected: 82,
      total: 100,
      amount: "$18,900",
    },
    { category: "Library Fee", collected: 94, total: 100, amount: "$12,600" },
    { category: "Sports Fee", collected: 67, total: 100, amount: "$8,450" },
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
        Fee Collection Status
      </Typography>
      <Box sx={{ mt: 3 }}>
        {feeCategories.map((fee, index) => {
          const percentage = (fee.collected / fee.total) * 100;
          return (
            <Box key={index} mb={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="body2" fontWeight={500}>
                  {fee.category}
                </Typography>
                <Typography variant="body2" fontWeight={600} color="primary">
                  {fee.amount}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: alpha("#E0E0E0", 0.3),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 3,
                      backgroundColor:
                        percentage >= 90
                          ? "#4CAF50"
                          : percentage >= 70
                          ? "#FF9800"
                          : "#F44336",
                    },
                  }}
                />
                <Typography variant="caption" fontWeight={600} minWidth={35}>
                  {percentage.toFixed(0)}%
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {fee.collected} of {fee.total} students paid
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

const FinancialDashboard: React.FC = () => {
  const theme = useTheme();

  const financeCards = [
    {
      title: "Total Revenue",
      amount: "$345,670",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <MoneyIcon />,
      color: theme.palette.success.main,
    },
    {
      title: "Outstanding Fees",
      amount: "$23,450",
      change: "-8.2%",
      changeType: "positive" as const,
      icon: <ReceiptIcon />,
      color: theme.palette.warning.main,
    },
    {
      title: "Monthly Collections",
      amount: "$45,670",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: <CardIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: "Bank Balance",
      amount: "$189,340",
      change: "+5.7%",
      changeType: "positive" as const,
      icon: <BankIcon />,
      color: theme.palette.info.main,
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
        Financial Dashboard
      </Typography>

      {/* Finance Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {financeCards.map((card, index) => (
          <Box key={index}>
            <FinanceCard {...card} />
          </Box>
        ))}
      </Box>

      {/* Charts and Analysis */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <RevenueChart />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FeeCollectionStatus />
        </Box>
      </Box>
    </Box>
  );
};

export default FinancialDashboard;
