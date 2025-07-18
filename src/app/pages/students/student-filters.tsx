import {
  TextField,
  MenuItem,
  Paper,
  InputAdornment,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { Filters } from "./type-hooks/type";

interface StudentFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const StudentFilters = ({ filters, setFilters }: StudentFiltersProps) => {
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const sections = ["A", "B", "C", "D"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 2, mb: 3, borderRadius: 2, backgroundColor: "#f9f9f9" }}
    >
      <Grid
        container
        spacing={2}
        alignItems="flex-end"
        justifyContent="flex-start"
      >
        <Grid size={{ xs: 12, md: 1.5 }}>
          <TextField
            select
            fullWidth
            label="Class"
            name="class"
            value={filters.class}
            onChange={handleChange}
            variant="outlined"
            size="medium"
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    width: 150,
                  },
                },
              },
            }}
          >
            <MenuItem value="">All Classes</MenuItem>
            {classes.map((cls) => (
              <MenuItem key={cls} value={cls}>
                {cls}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 1.5 }}>
          <TextField
            select
            fullWidth
            label="Section"
            name="section"
            value={filters.section}
            onChange={handleChange}
            variant="outlined"
            size="medium"
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    width: 150,
                  },
                },
              },
            }}
          >
            <MenuItem value="">All Sections</MenuItem>
            {sections.map((sec) => (
              <MenuItem key={sec} value={sec}>
                {sec}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Search Students"
            name="search"
            value={filters.search}
            onChange={handleChange}
            variant="outlined"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ pointerEvents: "none" }}>
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentFilters;
