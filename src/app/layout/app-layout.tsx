// src/layout/Layout.tsx
import { Box } from "@mui/material";
import type { ReactNode } from "react";
import Sidebar from "./sidebar";
import Navbar from "./nav-bar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        <Navbar />
        <Box
          sx={{
            flex: 1,
            p: { xs: 1, sm: 1.5, md: 2 },
            pt: { xs: 12, sm: 11, md: 10 }, // Increased top padding to clear fixed navbar
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
