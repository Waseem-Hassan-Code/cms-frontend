import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
  Badge,
  useTheme,
  Divider,
} from "@mui/material";
import { useState, type MouseEvent } from "react";
import { blue } from "@mui/material/colors";

// Icons
import Settings from "@mui/icons-material/Settings";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import Notifications from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: blue[700],
        color: theme.palette.common.white,
        boxShadow: "none",
        borderBottom: `1px solid ${blue[800]}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
          minHeight: "64px",
        }}
      >
        {/* Left side - Brand and menu button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            EduSystem
          </Typography>
        </Box>

        {/* Right side - User controls */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={4} color="error">
                <Notifications fontSize="medium" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                John Doe
              </Typography>
              <Typography variant="caption" color={blue[100]}>
                Admin
              </Typography>
            </Box>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{
                  p: 0,
                  "&:hover": {
                    boxShadow: `0 0 0 2px ${blue[500]}`,
                  },
                }}
              >
                <Avatar
                  alt="John Doe"
                  src="/avatar.jpg"
                  sx={{
                    width: 36,
                    height: 36,
                    border: `2px solid ${blue[300]}`,
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => console.log("Profile clicked")}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem onClick={() => console.log("Settings clicked")}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => console.log("Logout clicked")}>
              <ListItemIcon>
                <Logout fontSize="small" color="error" />
              </ListItemIcon>
              <Typography color="error">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
