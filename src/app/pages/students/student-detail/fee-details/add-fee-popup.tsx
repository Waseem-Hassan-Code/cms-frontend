import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Chip,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { startOfMonth } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../../redux/store";
import { useParams } from "react-router-dom";
import type { RootState } from "../../../../../redux/store";

import type {
  FeeDetailsDto,
  StudentFeeVoucher,
} from "../../../../../models/fee-details";
import { addMonthlyFeeVoucher } from "../../../../../redux/enrolled-students/enrolled-student-thunk";
import { toast } from "sonner";
import { setRefreshFlag } from "../../../../../redux/enrolled-students/enrolled-student-slice";

interface AddFeePopupProps {
  open: boolean;
  onClose: () => void;
}

const AddFeePopup = ({ open, onClose }: AddFeePopupProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  // 🔹 Load fee types from settings
  const { settings } = useSelector(
    (state: RootState) => state.applicationSettings
  );
  const { studentTuitionFee } = useSelector(
    (state: RootState) => state.enrolledStudents
  );

  const feeTypes: FeeDetailsDto[] = settings?.feeDetails ?? [];

  // Local UI state
  const [selectedFeeTypeIds, setSelectedFeeTypeIds] = useState<string[]>([]);
  const [feeAmount, setFeeAmount] = useState<number>(0); // auto-populated, read-only
  const [remarks, setRemarks] = useState<string>("");
  const [voucherMonth, setVoucherMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  // Build quick lookup map
  const feeTypeById = useMemo(() => {
    const m: Record<string, FeeDetailsDto> = {};
    for (const f of feeTypes) if (f.id) m[f.id] = f;
    return m;
  }, [feeTypes]);

  // Auto-populate Tuition Fee (non-editable) from store when dialog opens or source changes
  useEffect(() => {
    // Try to handle both numeric and object shapes gracefully
    const auto =
      typeof studentTuitionFee === "number"
        ? studentTuitionFee
        : Number((studentTuitionFee as any)?.amount ?? 0);

    setFeeAmount(Number.isFinite(auto) ? auto : 0);
  }, [studentTuitionFee, open]);

  const handleSave = () => {
    const feeVoucherItems = selectedFeeTypeIds
      .map((fid) => {
        const meta = feeTypeById[fid];
        if (!meta) return null;
        return {
          feeTypeId: fid,
          feeAmount: Number(meta.feeAmount ?? 0),
        };
      })
      .filter(Boolean) as { feeTypeId: string; feeAmount: number }[];

    const data: StudentFeeVoucher = {
      studentId: id!,
      feeVoucherItems,
      dueDate: null,
      // Convert Date to YYYY-MM-DD format for DateOnly
      voucherMonthYear: voucherMonth.toISOString().split("T")[0], // "2025-01-01"
      tutionFee: feeAmount,
      remarks,
    };

    dispatch(addMonthlyFeeVoucher(data))
      .unwrap()
      .then(() => {
        toast.success("Fee voucher added successfully");
        dispatch(setRefreshFlag());
        onClose();
      })
      .catch((err) => {
        toast.error(err || "Failed to add fee voucher");
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Fee</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        {/* Fee Types: Multi-select dropdown with chips (optional) */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="fee-types-label">Fee Types (optional)</InputLabel>
          <Select
            labelId="fee-types-label"
            multiple
            value={selectedFeeTypeIds}
            onChange={(e) => setSelectedFeeTypeIds(e.target.value as string[])}
            input={<OutlinedInput label="Fee Types (optional)" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as string[]).map((fid) => {
                  const f = feeTypeById[fid];
                  if (!f) return null;
                  return (
                    <Chip
                      key={fid}
                      label={`${f.feeType} — Rs. ${f.feeAmount}`}
                      sx={{ borderRadius: 2, fontWeight: 600 }}
                    />
                  );
                })}
              </Box>
            )}
            MenuProps={{ PaperProps: { style: { maxHeight: 360 } } }}
          >
            {feeTypes.length === 0 ? (
              <MenuItem disabled>No fee types available</MenuItem>
            ) : (
              feeTypes.map((f) =>
                f.id ? (
                  <MenuItem key={f.id} value={f.id}>
                    <Checkbox checked={selectedFeeTypeIds.includes(f.id)} />
                    <ListItemText
                      primary={`${f.feeType} — Rs. ${f.feeAmount}`}
                    />
                  </MenuItem>
                ) : null
              )
            )}
          </Select>
          {feeTypes.length === 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Load Application Settings first.
            </Typography>
          )}
        </FormControl>

        {/* Tuition Fee: auto-populated & non-editable */}
        <TextField
          label="Tuition Fee"
          type="number"
          value={feeAmount}
          fullWidth
          margin="normal"
          inputProps={{ min: 0, readOnly: true }}
          disabled
          helperText="Auto-populated from student tuition fee"
        />

        {/* Voucher Month: month/year only; defaults to current month */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Voucher Month"
            value={voucherMonth}
            onChange={(val) => {
              // keep it as the first day of the month internally
              if (val) setVoucherMonth(startOfMonth(val));
            }}
            views={["year", "month"]}
            openTo="month"
            disableFuture
            // v6 uses 'format' rather than inputFormat
            format="MMM yyyy"
            slotProps={{
              textField: { fullWidth: true, margin: "normal" },
            }}
          />
        </LocalizationProvider>

        {/* Remarks */}
        <TextField
          label="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          minRows={2}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary" variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={!id} // fee types are optional now
          sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFeePopup;
