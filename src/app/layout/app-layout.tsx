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
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ p: 3, mt: 8 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
