import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../redux/school-settings/class-config/class-thunk";
import { getSections } from "../../redux/school-settings/section-config/section-thunk";
import { enrollStudent } from "../../redux/student-admission/student-admission-thunks";
import { toast } from "sonner";

interface AdmitStudentDialogProps {
  open: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  registrationNumber: string;
  onEnrollSuccess: () => void;
}

export const AdmitStudentDialog: React.FC<AdmitStudentDialogProps> = ({
  open,
  onClose,
  studentId,
  studentName,
  registrationNumber,
  onEnrollSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const schoolClasses = useSelector(
    (state: RootState) => state.classSettings.schoolClasses
  );
  const sections = useSelector(
    (state: RootState) => state.sectionSettings.sections
  );

  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [loadingSections, setLoadingSections] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  // Fetch classes on open
  useEffect(() => {
    if (open) {
      dispatch(getClasses());
      setSelectedClassId("");
      setSelectedSectionId("");
    }
  }, [open, dispatch]);

  // Fetch sections when class changes
  useEffect(() => {
    if (selectedClassId) {
      setLoadingSections(true);
      dispatch(getSections(selectedClassId))
        .unwrap()
        .finally(() => setLoadingSections(false));
      setSelectedSectionId("");
    }
  }, [selectedClassId, dispatch]);

  const handleEnroll = () => {
    if (!selectedClassId || !selectedSectionId) return;
    setEnrolling(true);
    dispatch(
      enrollStudent({
        studentId,
        classId: selectedClassId,
        sectionId: selectedSectionId,
        isActive: true,
      })
    )
      .unwrap()
      .then((response) => {
        setEnrolling(false);
        onEnrollSuccess();
        onClose();
        toast.success(response.message || "Student enrolled successfully");
      })
      .catch((error) => {
        setEnrolling(false);
        toast.error(error.message || "Enrollment failed. Please try again.");
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        Admit Student: {studentName} ({registrationNumber})
      </DialogTitle>
      <DialogContent>
        <input type="hidden" value={studentId} />
        <Box mt={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="class-label">Class</InputLabel>
            <Select
              labelId="class-label"
              value={selectedClassId}
              label="Class"
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              {schoolClasses.length === 0 ? (
                <MenuItem value="">
                  <Typography variant="body2" align="center">
                    Loading...
                  </Typography>
                </MenuItem>
              ) : (
                schoolClasses.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.className} ({cls.classSymbol})
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            disabled={!selectedClassId || loadingSections}
          >
            <InputLabel id="section-label">Section</InputLabel>
            <Select
              labelId="section-label"
              value={selectedSectionId}
              label="Section"
              onChange={(e) => setSelectedSectionId(e.target.value)}
            >
              {loadingSections ? (
                <MenuItem value="">
                  <Typography variant="body2" align="center">
                    Loading...
                  </Typography>
                </MenuItem>
              ) : (
                Array.isArray(sections) &&
                sections.map((sec) => (
                  <MenuItem key={sec.id} value={sec.id}>
                    {sec.sectionName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={enrolling}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleEnroll}
          disabled={!selectedClassId || !selectedSectionId || enrolling}
        >
          {enrolling ? <CircularProgress size={24} /> : "Enroll"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
