import { Box, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface PreviousAcademiaProps {
  control: any;
  errors: any;
}

const PreviousAcademia = ({ control, errors }: PreviousAcademiaProps) => {
  useForm({
    defaultValues: {
      admissionDate: null,
      previousSchool: "",
      previousClass: "",
      registrationNumber: "",
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="admissionDate"
              control={control}
              rules={{ required: "Admission date is required" }}
              render={({ field }) => (
                <DatePicker
                  label="Admission Date"
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.admissionDate,
                      helperText: errors.admissionDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="previousSchool"
              control={control}
              // rules={{ required: "Previous school is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Previous School"
                  fullWidth
                  error={!!errors.previousSchool}
                  helperText={errors.previousSchool?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="previousClass"
              control={control}
              // rules={{ required: "Previous class is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Previous Class"
                  fullWidth
                  error={!!errors.previousClass}
                  helperText={errors.previousClass?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="registrationNumber"
              control={control}
              disabled
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Registration Number"
                  fullWidth
                  error={!!errors.registrationNumber}
                  helperText={errors.registrationNumber?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default PreviousAcademia;
