// src/pages/admissions/components/form-steps/PersonalInfoStep.tsx
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface PersonalInfoStepProps {
  control: any;
  errors: any;
}

const PersonalInfoStep = ({ control, errors }: PersonalInfoStepProps) => {
  useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "Female",
      dateOfBirth: null,
      bloodGroup: "",
      religion: "Islam",
      nationality: "Pakistani",
    },
  });

  const genders = ["Male", "Female", "Other"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const religions = ["Islam", "Christianity", "Hinduism", "Sikhism", "Other"];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mb: 3, fontWeight: 600, color: "text.primary" }}
        >
          Personal Information
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Gender"
                    fullWidth
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                    sx={{ mb: 2 }}
                  >
                    {genders.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="Date of Birth"
                    value={field.value}
                    onChange={field.onChange}
                    sx={{ mb: 2 }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dateOfBirth,
                        helperText: errors.dateOfBirth?.message,
                        sx: { mb: 2 },
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="bloodGroup"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Blood Group"
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="">
                      <em>Select Blood Group</em>
                    </MenuItem>
                    {bloodGroups.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="religion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Religion"
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    {religions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="nationality"
                control={control}
                defaultValue="Pakistani"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nationality"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default PersonalInfoStep;
