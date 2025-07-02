import AppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

const Toolbar = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <MuiToolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </MuiToolbar>
      </AppBar>
    </>
  );
};

export default Toolbar;
