// src/pages/admissions/components/form-steps/FeeInfoStep.tsx
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface FeeInfoStepProps {
  control: any;
  errors: any;
}

const FeeInfoStep = ({ control, errors }: FeeInfoStepProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Admission Fee Details
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="admissionFee"
            control={control}
            rules={{
              required: "Admission fee is required",
              min: { value: 0, message: "Fee cannot be negative" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Admission Fee"
                fullWidth
                type="number"
                error={!!errors.admissionFee}
                helperText={errors.admissionFee?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="tuitionFee"
            control={control}
            rules={{
              required: "Tuition fee is required",
              min: { value: 0, message: "Fee cannot be negative" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Monthly Tuition Fee"
                fullWidth
                type="number"
                error={!!errors.tuitionFee}
                helperText={errors.tuitionFee?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: "Payment method is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Payment Method"
                fullWidth
                error={!!errors.paymentMethod}
                helperText={errors.paymentMethod?.message}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Online Payment">Online Payment</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="remarks"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Remarks"
                fullWidth
                multiline
                rows={3}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeeInfoStep;
