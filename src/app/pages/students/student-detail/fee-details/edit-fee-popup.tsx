import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../redux/store";
import { createOrUpdateMontlyFee } from "../../../../../redux/enrolled-students/enrolled-student-thunk";
import { toast } from "sonner";
import { setStudentTutionFee } from "../../../../../redux/enrolled-students/enrolled-student-slice";
import { useParams } from "react-router-dom";

interface EditFeePopupProps {
  open: boolean;
  onClose: () => void;
}

const EditFeePopup = ({ open, onClose }: EditFeePopupProps) => {
  const { studentTuitionFee } = useSelector(
    (state: RootState) => state.enrolledStudents
  );
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [feeAmount, setFeeAmount] = useState<number>(studentTuitionFee || 0);

  useEffect(() => {
    setFeeAmount(studentTuitionFee || 0);
    console.log("Student Tuition Fee updated:", studentTuitionFee);
  }, [studentTuitionFee]);

  const handleSave = () => {
    dispatch(createOrUpdateMontlyFee({ id: id!, amount: feeAmount }))
      .unwrap()
      .then(() => {
        toast.success("Monthly fee updated successfully");
        dispatch(setStudentTutionFee(feeAmount));
        onClose();
      })
      .catch((error) => {
        toast.error(error || "Failed to update monthly fee");
      });
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
