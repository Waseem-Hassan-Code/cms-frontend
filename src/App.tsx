import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./app/router/app-routes";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
      ;
    </>
  );
}

export default App;
