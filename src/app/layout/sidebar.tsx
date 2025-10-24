import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import SettingsIcon from "@mui/icons-material/Settings";
import type { JSX } from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const drawerWidth = 280;

interface NavItem {
  text: string;
  icon: JSX.Element;
  path: string;
}

const primaryNavItems: NavItem[] = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Students", icon: <SchoolIcon />, path: "/students" },
  { text: "Teachers", icon: <PeopleIcon />, path: "/teachers" },
  { text: "Classes", icon: <ClassIcon />, path: "/classes" },
  { text: "Attendance", icon: <FactCheckIcon />, path: "/attendance" },
  { text: "Admissions", icon: <HowToRegIcon />, path: "/admission" },
];

const secondaryNavItems: NavItem[] = [
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
          borderRight: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* Adjusted Toolbar with proper top spacing */}
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          px: 3,
          py: 3,
          mt: "64px", // Matches Navbar height
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Avatar
          sx={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            width: 40,
            height: 40,
            mr: 2,
            fontWeight: "bold",
            color: "white",
            boxShadow: "0 4px 12px rgba(79, 172, 254, 0.4)",
          }}
        >
          ES
        </Avatar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight="bold"
          sx={{
            color: "white",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          EduSystem
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto", px: 2, py: 2 }}>
        <List>
          {primaryNavItems.map(({ text, icon, path }) => (
            <NavLink to={path} key={text} style={{ textDecoration: "none" }}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={location.pathname === path}
                  sx={{
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&.Mui-selected": {
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "#e2e8f0",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === path ? "white" : "#64748b",
                      minWidth: "40px",
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === path ? "600" : "500",
                      color: location.pathname === path ? "white" : "#475569",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>

        <Divider sx={{ my: 2, borderColor: "#cbd5e0" }} />

        <List>
          {secondaryNavItems.map(({ text, icon, path }) => (
            <NavLink to={path} key={text} style={{ textDecoration: "none" }}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={location.pathname === path}
                  sx={{
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&.Mui-selected": {
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "#e2e8f0",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === path ? "white" : "#64748b",
                      minWidth: "40px",
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === path ? "600" : "500",
                      color: location.pathname === path ? "white" : "#475569",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 3, mt: "auto" }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            borderRadius: 3,
            p: 2,
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(240, 147, 251, 0.4)",
          }}
        >
          <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
            Need help?
          </Typography>
          <Typography
            variant="body2"
            fontWeight="medium"
            sx={{ color: "white" }}
          >
            Contact Support
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
