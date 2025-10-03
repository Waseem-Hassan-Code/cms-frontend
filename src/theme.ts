import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    // TextField styling
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#ffffff",
            transition: "all 0.2s ease-in-out",
            "& fieldset": {
              borderColor: "#e0e0e0",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "#1976d2",
              borderWidth: "1px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
              borderWidth: "2px",
              boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.1)",
            },
            "&.Mui-error fieldset": {
              borderColor: "#d32f2f",
            },
            "&.Mui-error:hover fieldset": {
              borderColor: "#d32f2f",
            },
            "&.Mui-error.Mui-focused fieldset": {
              borderColor: "#d32f2f",
              boxShadow: "0 0 0 3px rgba(211, 47, 47, 0.1)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#666666",
            fontWeight: 500,
            "&.Mui-focused": {
              color: "#1976d2",
              fontWeight: 600,
            },
            "&.Mui-error": {
              color: "#d32f2f",
            },
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
            marginTop: 6,
            fontSize: "0.75rem",
          },
        },
      },
    },
    // FormControl styling
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
        },
      },
    },
    // Select styling
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e0e0e0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
            borderWidth: "2px",
            boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.1)",
          },
        },
      },
    },
    // Button styling
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          background: "linear-gradient(45deg, #1976d2, #42a5f5)",
          "&:hover": {
            background: "linear-gradient(45deg, #1565c0, #1976d2)",
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
            backgroundColor: "rgba(25, 118, 210, 0.04)",
          },
        },
      },
    },
    // Paper styling
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    // Card styling
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    // Tab styling
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "12px 12px 0 0",
          "&.Mui-selected": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
          },
        },
      },
    },
    // DataGrid styling (if needed, import separately)
    // MuiDataGrid: {
    //   styleOverrides: {
    //     root: {
    //       border: 'none',
    //       borderRadius: 16,
    //       '& .MuiDataGrid-columnHeaders': {
    //         backgroundColor: '#f5f5f5',
    //         borderRadius: '16px 16px 0 0',
    //       },
    //       '& .MuiDataGrid-cell': {
    //         borderBottom: '1px solid #f0f0f0',
    //       },
    //       '& .MuiDataGrid-row:hover': {
    //         backgroundColor: 'rgba(25, 118, 210, 0.04)',
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;
