import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Chip,
  OutlinedInput,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect } from "react";
import {
  getAdmissionVoucher,
  getFeeTypes,
} from "../../../../redux/fee-details/fee-detail-thunk";
import { clearFeeTypes } from "../../../../redux/fee-details/fee-detail-slice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface FeeInfoStepProps {
  control: any;
  errors: any;
  setValue: any;
}

type FeeType = {
  feeTypeId: string;
  feeAmount: number;
};
type FormValues = {
  selectedFeeTypes: FeeType[];
  tuitionFee: number;
  remarks: string;
  dueDate: Date | null;
  voucherMonth: Date | null;
};

const FeeInfoStep = ({ control, errors, setValue }: FeeInfoStepProps) => {
  const selectedFees = useWatch<FormValues, "selectedFeeTypes">({
    control,
    name: "selectedFeeTypes",
    defaultValue: [],
  });

  const tuitionFee = useWatch<FormValues, "tuitionFee">({
    control,
    name: "tuitionFee",
    defaultValue: 0,
  });

  const { feeDetails, admissionVoucher } = useSelector(
    (state: RootState) => state.feeDetails
  );

  const { settings } = useSelector(
    (state: RootState) => state.applicationSettings
  );

  const dispatch = useDispatch<AppDispatch>();
  const { studentId } = useSelector(
    (state: RootState) => state.studentAdmission
  );

  useEffect(() => {
    if (!settings?.feeDetails || settings.feeDetails.length === 0) {
      dispatch(getFeeTypes());
      dispatch(getAdmissionVoucher({ id: studentId! }));
    }
    return () => {
      dispatch(clearFeeTypes());
    };
  }, [dispatch]);

  useEffect(() => {
    if (admissionVoucher) {
      const mappedSelectedFees: FeeType[] = (
        admissionVoucher.feeVoucherItems || []
      ).map((item) => ({
        feeTypeId: item.feeTypeId,
        feeAmount: item.feeAmount,
      }));

      setValue("selectedFeeTypes", mappedSelectedFees);

      setValue("tuitionFee", admissionVoucher.tutionFee ?? 0);

      setValue("remarks", admissionVoucher.remarks || "");

      setValue(
        "dueDate",
        admissionVoucher.dueDate ? new Date(admissionVoucher.dueDate) : null
      );

      setValue(
        "voucherMonth",
        admissionVoucher.voucherMonth
          ? new Date(admissionVoucher.voucherMonth)
          : null
      );
    }
  }, [admissionVoucher, setValue]);

  const selectedFeeDetails = (feeDetails || [])
    .filter((opt) => selectedFees.some((fee) => fee.feeTypeId === opt.id))
    .map((opt) => ({
      ...opt,
      feeAmount:
        selectedFees.find((fee) => fee.feeTypeId === opt.id)?.feeAmount || 0,
    }));

  const totalAmount =
    selectedFeeDetails.reduce((sum, fee) => sum + fee.feeAmount, 0) +
    Number(tuitionFee || 0);

  const numberToWords = (num: number): string => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (num === 0) return "Zero Only";
    if (num < 20) return `${a[num]} Only`;
    if (num < 100)
      return `${b[Math.floor(num / 10)]} ${a[num % 10]}`.trim() + " Only";
    if (num < 1000)
      return (
        `${a[Math.floor(num / 100)]} Hundred ${numberToWords(
          num % 100
        )}`.replace(" Only", "") + " Only"
      );
    if (num < 1000000) {
      return (
        numberToWords(Math.floor(num / 1000)).replace(" Only", "") +
        " Thousand " +
        numberToWords(num % 1000).replace(" Only", "") +
        " Only"
      ).replace(/\s+/g, " ");
    }
    return num.toString() + " Only";
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "primary.main",
            letterSpacing: 1,
            textShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          Fee Details
        </Typography>

        <Grid container spacing={3}>
          {/* Multi Select Fee Types */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="selectedFeeTypes"
              control={control}
              rules={{ required: "Please select at least one fee" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 2,
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                  }}
                >
                  <InputLabel>Fee Types</InputLabel>
                  <Select
                    {...field}
                    value={(field.value || []).map(
                      (f: FeeType) => `${f.feeTypeId}:${f.feeAmount}`
                    )}
                    onChange={(e) => {
                      const selectedValues = e.target.value as string[];
                      const parsedFees = selectedValues.map((val) => {
                        const [feeTypeId, feeAmount] = val.split(":");
                        return { feeTypeId, feeAmount: Number(feeAmount) };
                      });
                      field.onChange(parsedFees);
                    }}
                    multiple
                    input={<OutlinedInput label="Fee Types" />}
                    renderValue={(selected: string[]) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => {
                          const [id, amount] = value.split(":");
                          const fee = settings?.feeDetails?.find(
                            (f) => f.id === id
                          );
                          return (
                            <Chip
                              key={id}
                              label={`${
                                fee?.feeType || "Unknown"
                              } — Rs. ${amount}`}
                              sx={{
                                bgcolor: "primary.light",
                                color: "primary.dark",
                                fontWeight: 600,
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    {(settings?.feeDetails || []).map((fee) => (
                      <MenuItem
                        key={fee.id}
                        value={`${fee.id}:${fee.feeAmount}`}
                      >
                        {fee.feeType} — Rs. {fee.feeAmount}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.selectedFeeTypes && (
                    <Typography color="error" variant="caption">
                      {errors.selectedFeeTypes.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Tuition Fee */}
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
                  variant="outlined"
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 2,
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                    "& .MuiInputBase-root": {
                      borderRadius: 2,
                      fontWeight: 600,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputLabel shrink sx={{ color: "primary.main", mr: 1 }}>
                        Rs
                      </InputLabel>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* Due Date */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="dueDate"
              control={control}
              rules={{ required: "Due date is required" }}
              defaultValue={Date.now()}
              render={({ field }) => (
                <DatePicker
                  label="Due Date"
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dueDate,
                      helperText: errors.dueDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Voucher Month Picker */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="voucherMonth"
              control={control}
              rules={{ required: "Voucher month is required" }}
              render={({ field }) => (
                <DatePicker
                  label="Voucher For Month Of"
                  views={["year", "month"]}
                  value={field.value}
                  onChange={(date) => {
                    // Always set day to 1
                    if (date) {
                      const fixedDate = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        1
                      );
                      field.onChange(fixedDate);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.voucherMonth,
                      helperText: errors.voucherMonth?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Voucher */}
        <Box
          sx={{
            mt: 4,
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            background: "linear-gradient(135deg, #f8fafc 0%, #e3f2fd 100%)",
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.07)",
            border: "1px solid #e3e3e3",
            maxWidth: 500,
            mx: "auto",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "primary.main",
              letterSpacing: 1,
              mb: 2,
              textAlign: "center",
            }}
          >
            Fee Voucher
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              fontWeight: 600,
              color: "primary.dark",
              borderBottom: "1.5px solid #b3c2e0",
              pb: 1,
            }}
          >
            <Typography variant="subtitle2">Fee Type</Typography>
            <Typography variant="subtitle2">Amount (Rs.)</Typography>
          </Box>
          {selectedFeeDetails.map((fee) => (
            <Box
              key={fee.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 0.5,
                borderBottom: "1px dashed #e0e0e0",
              }}
            >
              <Typography sx={{ color: "primary.dark" }}>
                {fee.feeType}
              </Typography>
              <Typography sx={{ fontWeight: 500 }}>{fee.feeAmount}</Typography>
            </Box>
          ))}
          {tuitionFee > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 0.5,
                borderBottom: "1px dashed #e0e0e0",
              }}
            >
              <Typography sx={{ color: "primary.dark" }}>
                Tuition Fee
              </Typography>
              <Typography sx={{ fontWeight: 500 }}>{tuitionFee}</Typography>
            </Box>
          )}
          <Box
            sx={{
              borderTop: "2px solid #b3c2e0",
              mt: 2,
              pt: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#e3f2fd",
              borderRadius: 2,
              px: 2,
              py: 1,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Total
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                letterSpacing: 1,
              }}
            >
              {totalAmount}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: "primary.dark",
              fontStyle: "italic",
              textAlign: "right",
              fontWeight: 500,
            }}
          >
            {numberToWords(totalAmount)}
          </Typography>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default FeeInfoStep;
