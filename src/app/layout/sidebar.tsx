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
  useTheme,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import SettingsIcon from "@mui/icons-material/Settings";
import type { JSX } from "react";
import { blue } from "@mui/material/colors";

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
];

const secondaryNavItems: NavItem[] = [
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: blue[50],
          borderRight: "none",
          boxShadow: theme.shadows[2],
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
          backgroundColor: blue[100],
          borderBottom: `1px solid ${blue[200]}`,
        }}
      >
        <Avatar
          sx={{
            bgcolor: blue[600],
            width: 40,
            height: 40,
            mr: 2,
            fontWeight: "bold",
            color: theme.palette.common.white,
          }}
        >
          ES
        </Avatar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight="bold"
          color={blue[800]}
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
                    "&.Mui-selected": {
                      backgroundColor: blue[200],
                      color: blue[800],
                      "&:hover": {
                        backgroundColor: blue[200],
                      },
                    },
                    "&:hover": {
                      backgroundColor: blue[100],
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === path ? blue[800] : blue[600],
                      minWidth: "40px",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === path ? "600" : "500",
                      color: location.pathname === path ? blue[900] : blue[700],
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>

        <Divider sx={{ my: 2, borderColor: blue[200] }} />

        <List>
          {secondaryNavItems.map(({ text, icon, path }) => (
            <NavLink to={path} key={text} style={{ textDecoration: "none" }}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={location.pathname === path}
                  sx={{
                    borderRadius: 2,
                    "&.Mui-selected": {
                      backgroundColor: blue[200],
                      color: blue[800],
                    },
                    "&:hover": {
                      backgroundColor: blue[100],
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === path ? blue[800] : blue[600],
                      minWidth: "40px",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === path ? "600" : "500",
                      color: location.pathname === path ? blue[900] : blue[700],
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
            backgroundColor: blue[100],
            borderRadius: 3,
            p: 2,
            textAlign: "center",
            border: `1px solid ${blue[200]}`,
          }}
        >
          <Typography variant="body2" color={blue[800]} mb={1}>
            Need help?
          </Typography>
          <Typography variant="body2" fontWeight="medium" color={blue[800]}>
            Contact Support
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
