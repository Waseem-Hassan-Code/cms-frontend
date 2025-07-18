import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./app/router/app-routes";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import theme from "./theme";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </Provider>
      </LocalizationProvider>
      ;
    </>
  );
}

export default App;
