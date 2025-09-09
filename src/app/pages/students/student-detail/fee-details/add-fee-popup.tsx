import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/lab";
import { LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface AddFeePopupProps {
  open: boolean;
  onClose: () => void;
}

const feeTypes = ["Admission Fee", "Tuition Fee", "Transport Fee"];

const AddFeePopup = ({ open, onClose }: AddFeePopupProps) => {
  const [selectedFeeTypes, setSelectedFeeTypes] = useState<string[]>([]);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [remarks, setRemarks] = useState<string>("");
  const [feeMonth, setFeeMonth] = useState<Date | null>(new Date());

  const handleFeeTypeChange = (event: any) => {
    setSelectedFeeTypes(event.target.value);
  };

  const handleSave = () => {
    // Handle saving the new fee item here
    console.log("Saving Fee:", {
      selectedFeeTypes,
      feeAmount,
      remarks,
      feeMonth,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Fee</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Fee Types</InputLabel>
          <Select
            multiple
            value={selectedFeeTypes}
            onChange={handleFeeTypeChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {feeTypes.map((fee) => (
              <MenuItem key={fee} value={fee}>
                <Checkbox checked={selectedFeeTypes.indexOf(fee) > -1} />
                <ListItemText primary={fee} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Fee Amount"
          type="number"
          value={feeAmount}
          onChange={(e) => setFeeAmount(Number(e.target.value))}
          fullWidth
          margin="normal"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fee Month"
            value={feeMonth}
            onChange={setFeeMonth}
            renderInput={(props: any) => (
              <TextField {...props} fullWidth margin="normal" />
            )}
            views={["month", "year"]}
            disableFuture
          />
        </LocalizationProvider>

        <TextField
          label="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFeePopup;
