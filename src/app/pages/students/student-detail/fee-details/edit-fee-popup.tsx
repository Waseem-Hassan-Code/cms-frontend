import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

interface EditFeePopupProps {
  open: boolean;
  onClose: () => void;
}

const EditFeePopup = ({ open, onClose }: EditFeePopupProps) => {
  const [feeAmount, setFeeAmount] = useState<number>(0);

  const handleSave = () => {
    // Handle saving the edited fee here
    console.log("Updated Fee:", feeAmount);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Student Monthly Fee</DialogTitle>
      <DialogContent>
        <TextField
          label="Fee Amount"
          type="number"
          value={feeAmount}
          onChange={(e) => setFeeAmount(Number(e.target.value))}
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

export default EditFeePopup;
