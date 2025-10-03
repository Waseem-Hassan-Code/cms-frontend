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
import { useFeeTypes } from "../../../contexts/fee-types-context";

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

  const { admissionVoucher, feeDetails } = useSelector(
    (state: RootState) => state.feeDetails
  );

  const { feeTypes } = useFeeTypes(); // Use the context for fee types

  // Fallback to Redux state if context doesn't have fee types
  const availableFeeTypes =
    feeTypes && feeTypes.length > 0 ? feeTypes : feeDetails || [];
  const dispatch = useDispatch<AppDispatch>();
  const { studentId } = useSelector(
    (state: RootState) => state.studentAdmission
  );

  useEffect(() => {
    dispatch(getFeeTypes());
    if (studentId) {
      dispatch(getAdmissionVoucher({ id: studentId! }));
    }
    return () => {
      dispatch(clearFeeTypes());
    };
  }, [dispatch, studentId]);

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
        admissionVoucher.voucherMonthYear
          ? new Date(admissionVoucher.voucherMonthYear)
          : null
      );
    }
  }, [admissionVoucher, setValue]);

  const selectedFeeDetails = (availableFeeTypes || [])
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
                          const fee = availableFeeTypes?.find(
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
                    {(availableFeeTypes || []).map((fee) => (
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

        {/* Modern Fee Voucher */}
        <Box
          sx={{
            mt: 4,
            p: 0,
            borderRadius: 4,
            background: "#fff",
            boxShadow: "0 12px 40px 0 rgba(0,0,0,0.08)",
            border: "1px solid #f0f4f8",
            maxWidth: 600,
            mx: "auto",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              color: "#fff",
              p: 3,
              textAlign: "center",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "10px solid #1976d2",
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: 1.2,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              📋 Fee Voucher
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                mt: 0.5,
                fontWeight: 500,
              }}
            >
              Admission Fee Details
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3 }}>
            {/* Fee Items */}
            <Box sx={{ mb: 3 }}>
              {selectedFeeDetails.map((fee, index) => (
                <Box
                  key={fee.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 2,
                    px: 2,
                    mb: 1.5,
                    borderRadius: 2,
                    backgroundColor: index % 2 === 0 ? "#f8fafc" : "#fff",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        mr: 2,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "#1a202c",
                      }}
                    >
                      {fee.feeType}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                      fontFamily: "monospace",
                    }}
                  >
                    Rs. {fee.feeAmount.toLocaleString()}
                  </Typography>
                </Box>
              ))}

              {tuitionFee > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 2,
                    px: 2,
                    mb: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#fff3cd",
                    border: "1px solid #ffeaa7",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#fff8e1",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#f39c12",
                        mr: 2,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "#1a202c",
                      }}
                    >
                      Tuition Fee
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#f39c12",
                      fontFamily: "monospace",
                    }}
                  >
                    Rs. {tuitionFee.toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Total Section */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #e8f5e8, #c8e6c9)",
                borderRadius: 3,
                p: 3,
                border: "2px solid #4caf50",
                textAlign: "center",
                boxShadow: "0 4px 16px rgba(76, 175, 80, 0.2)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: "#2e7d32",
                  mb: 1,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontSize: "0.9rem",
                }}
              >
                Total Amount
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "#1b5e20",
                  fontFamily: "monospace",
                  letterSpacing: 2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Rs. {totalAmount.toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: "#2e7d32",
                  fontStyle: "italic",
                  fontWeight: 500,
                  textAlign: "center",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: 2,
                  p: 1.5,
                  border: "1px dashed #4caf50",
                }}
              >
                {numberToWords(totalAmount)}
              </Typography>
            </Box>

            {/* Footer Note */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "#f8fafc",
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                textAlign: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  fontStyle: "italic",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                📄 Please keep this voucher for your records
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default FeeInfoStep;
