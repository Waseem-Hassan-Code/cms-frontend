// src/pages/admissions/components/form-steps/ContactInfoStep.tsx
import { Box, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface ContactInfoStepProps {
  control: any;
  errors: any;
}

const ContactInfoStep = ({ control, errors }: ContactInfoStepProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="email"
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
                label="Email"
                fullWidth
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                multiline
                rows={2}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Postal Code" fullWidth />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="country"
            control={control}
            defaultValue="Pakistan"
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                fullWidth
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactInfoStep;
