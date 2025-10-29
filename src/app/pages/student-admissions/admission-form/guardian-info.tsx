// src/pages/admissions/components/form-steps/GuardianInfoStep.tsx
import { Box, Grid, TextField, MenuItem, InputAdornment } from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";

interface GuardianInfoStepProps {
  control: any;
  errors: any;
}

const countryCodes = [
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
];

const GuardianInfoStep = ({ control, errors }: GuardianInfoStepProps) => {
  const [primaryCountryCode, setPrimaryCountryCode] = useState("+92");
  const [secondaryCountryCode, setSecondaryCountryCode] = useState("+92");
  const [whatsappCountryCode, setWhatsappCountryCode] = useState("+92");

  const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, tab, escape, enter, home, end, arrows
    if (
      [8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].includes(e.keyCode) ||
      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) || // Ctrl+A
      (e.keyCode === 67 && e.ctrlKey === true) || // Ctrl+C
      (e.keyCode === 86 && e.ctrlKey === true) || // Ctrl+V
      (e.keyCode === 88 && e.ctrlKey === true) // Ctrl+X
    ) {
      return;
    }
    // Ensure that it's a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  const CountryCodeSelect = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <TextField
      select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ minWidth: 100 }}
      size="small"
    >
      {countryCodes.map((country) => (
        <MenuItem key={country.code} value={country.code}>
          {country.flag} {country.code}
        </MenuItem>
      ))}
    </TextField>
  );

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
            name="motherName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Mother's Name" fullWidth />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
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

        {/* Phone Numbers Section */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="primaryPhoneNumber"
            control={control}
            rules={{
              required: "Primary phone number is required",
              validate: (value) => {
                if (
                  !value ||
                  value.replace(/[^0-9]/g, "").length < 10 ||
                  value.replace(/[^0-9]/g, "").length > 11
                ) {
                  return "Phone number must be 10-11 digits";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Primary Phone Number"
                required
                error={!!errors.primaryPhoneNumber}
                helperText={
                  errors.primaryPhoneNumber?.message ||
                  "Enter phone number without country code"
                }
                onKeyDown={handleNumericInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CountryCodeSelect
                        value={primaryCountryCode}
                        onChange={setPrimaryCountryCode}
                      />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 11,
                  placeholder: "3001234567",
                }}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="secondaryPhoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Secondary Phone Number (Optional)"
                onKeyDown={handleNumericInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CountryCodeSelect
                        value={secondaryCountryCode}
                        onChange={setSecondaryCountryCode}
                      />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 11,
                  placeholder: "3001234567",
                }}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="whatsappNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="WhatsApp Number (Optional)"
                onKeyDown={handleNumericInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CountryCodeSelect
                        value={whatsappCountryCode}
                        onChange={setWhatsappCountryCode}
                      />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 11,
                  placeholder: "3001234567",
                }}
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GuardianInfoStep;
