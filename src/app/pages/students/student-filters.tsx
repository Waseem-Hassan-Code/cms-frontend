import React, { useEffect } from "react";
import {
  TextField,
  MenuItem,
  Paper,
  InputAdornment,
  Grid,
  Box,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { getClasses } from "../../../redux/school-settings/class-config/class-thunk";
import { getSections } from "../../../redux/school-settings/section-config/section-thunk";
import {
  setClassId,
  setSectionId,
  setSearchString,
} from "../../../redux/enrolled-students/enrolled-student-slice";

const StudentFilters = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const schoolClasses = useSelector(
    (state: RootState) => state.classSettings.schoolClasses
  );
  const sections = useSelector(
    (state: RootState) => state.sectionSettings.sections
  );

  const enrolledStudents =
    useSelector((state: RootState) => state.enrolledStudents) ?? {};
  const { classId = "", sectionId = "", searchString = "" } = enrolledStudents;

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  useEffect(() => {
    if (classId) {
      dispatch(getSections(classId));
    }
  }, [dispatch, classId]);

  // Separate handlers
  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Selected Class ID:", value);
    dispatch(setClassId(value));
    dispatch(setSectionId("")); // Reset section when class changes
  };

  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSectionId(value));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchString(value));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: 2,
        borderRadius: 2,
        background: `linear-gradient(135deg, #f8fafc 0%, ${theme.palette.primary.light} 100%)`,
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, sm: 2 }}
        alignItems="center"
        justifyContent="flex-start"
        sx={{ flexWrap: "wrap" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            select
            fullWidth
            label="Class"
            name="class"
            value={classId}
            onChange={handleClassChange}
            variant="outlined"
            size="small"
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              "& .MuiInputBase-root": {
                borderRadius: 2,
                fontWeight: 500,
              },
            }}
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
            {schoolClasses.map((cls) => (
              <MenuItem key={cls.id} value={cls.id}>
                {cls.className + ` (${cls.classSymbol})`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            select
            fullWidth
            label="Section"
            name="section"
            value={sectionId}
            onChange={handleSectionChange}
            variant="outlined"
            size="small"
            disabled={!classId}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              "& .MuiInputBase-root": {
                borderRadius: 2,
                fontWeight: 500,
              },
            }}
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
              <MenuItem key={sec.id} value={sec.id}>
                {sec.sectionName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              label="Search Students"
              name="search"
              value={searchString}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  fontWeight: 500,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ pointerEvents: "none" }}
                  >
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentFilters;
