// src/pages/admissions/components/form-steps/GuardianInfoStep.tsx
import { Box, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface GuardianInfoStepProps {
  control: any;
  errors: any;
}

const GuardianInfoStep = ({ control, errors }: GuardianInfoStepProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="fatherName"
            control={control}
            rules={{ required: "Father's name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Father's Name"
                fullWidth
                error={!!errors.fatherName}
                helperText={errors.fatherName?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="fatherOccupation"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Father's Occupation" fullWidth />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="fatherPhone"
            control={control}
            rules={{ required: "Father's phone is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Father's Phone"
                fullWidth
                error={!!errors.fatherPhone}
                helperText={errors.fatherPhone?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="motherName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Mother's Name" fullWidth />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="guardianEmail"
            control={control}
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Guardian Email"
                fullWidth
                type="email"
                error={!!errors.guardianEmail}
                helperText={errors.guardianEmail?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GuardianInfoStep;
