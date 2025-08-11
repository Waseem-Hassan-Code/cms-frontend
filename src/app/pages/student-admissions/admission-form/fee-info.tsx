// src/pages/admissions/components/form-steps/FeeInfoStep.tsx
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
  const dispatch = useDispatch<AppDispatch>();
  const { studentId } = useSelector(
    (state: RootState) => state.studentAdmission
  );

  useEffect(() => {
    if (!feeDetails || feeDetails.length === 0) {
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
    return num.toString() + " Only"; // fallback for large numbers
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
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
              <FormControl fullWidth>
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
                        const fee = feeDetails?.find((f) => f.id === id);
                        return (
                          <Chip
                            key={id}
                            label={`${
                              fee?.feeType || "Unknown"
                            } — Rs. ${amount}`}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {(feeDetails || []).map((fee) => (
                    <MenuItem key={fee.id} value={`${fee.id}:${fee.feeAmount}`}>
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
              />
            )}
          />
        </Grid>

        {/* Remarks */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="remarks"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Remarks"
                fullWidth
                multiline
                minRows={3}
                placeholder="Enter any additional notes about the fees..."
              />
            )}
          />
        </Grid>
      </Grid>

      {/* Voucher */}
      <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Fee Voucher
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="subtitle2">Fee Type</Typography>
          <Typography variant="subtitle2">Amount (Rs.)</Typography>
        </Box>
        {selectedFeeDetails.map((fee) => (
          <Box
            key={fee.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>{fee.feeType}</Typography>
            <Typography>{fee.feeAmount}</Typography>
          </Box>
        ))}
        {tuitionFee > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Tuition Fee</Typography>
            <Typography>{tuitionFee}</Typography>
          </Box>
        )}
        <Box
          sx={{
            borderTop: "1px solid #ccc",
            mt: 1,
            pt: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1">
            <strong>Total</strong>
          </Typography>
          <Typography variant="subtitle1">
            <strong>{totalAmount}</strong>
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {numberToWords(totalAmount)}
        </Typography>
        <Typography variant="body2">{totalAmount}</Typography>
      </Box>
    </Box>
  );
};

export default FeeInfoStep;
