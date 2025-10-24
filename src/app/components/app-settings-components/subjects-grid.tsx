import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Fade,
  Tooltip,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BookIcon from "@mui/icons-material/Book";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import {
  addSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
} from "../../../redux/school-settings/subject-config/subject-thunk";
import type {
  SubjectDto,
  CreateSubjectDto,
  UpdateSubjectDto,
} from "../../../models/school-settings";
import { toast } from "sonner";

export default function SubjectsGrid() {
  const dispatch = useDispatch<AppDispatch>();

  const { schoolClasses } = useSelector(
    (state: RootState) => state.classSettings
  );
  const { subjects, loading } = useSelector(
    (state: RootState) => state.subjectSettings
  );

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectDto | null>(null);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [headerClassId, setHeaderClassId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  useEffect(() => {
    if (headerClassId) {
      dispatch(getSubjects(headerClassId));
    }
  }, [dispatch, headerClassId]);

  useEffect(() => {
    if (schoolClasses.length > 0) {
      setHeaderClassId(schoolClasses[0].id!);
      setSelectedClassId(schoolClasses[0].id!);
    }
  }, [schoolClasses]);

  const handleAddSubject = () => {
    if (!subjectName.trim() || !subjectCode.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const subjectData: CreateSubjectDto = {
      subjectName: subjectName.trim(),
      subjectCode: subjectCode.trim(),
      classId: selectedClassId,
    };

    dispatch(addSubject(subjectData))
      .unwrap()
      .then((response) => {
        toast.success(response?.message || "Subject added successfully");
        dispatch(getSubjects(selectedClassId));
        handleCloseDialog();
      })
      .catch((err) => {
        toast.error(
          typeof err === "string" ? err : err?.message || "Something went wrong"
        );
      });
  };

  const handleUpdateSubject = () => {
    if (!subjectName.trim() || !subjectCode.trim() || !editingSubject) {
      toast.error("Please fill in all fields");
      return;
    }

    const subjectData: UpdateSubjectDto = {
      id: editingSubject.id,
      subjectName: subjectName.trim(),
      subjectCode: subjectCode.trim(),
      classId: selectedClassId,
    };

    dispatch(updateSubject(subjectData))
      .unwrap()
      .then((response) => {
        toast.success(response?.message || "Subject updated successfully");
        dispatch(getSubjects(selectedClassId));
        handleCloseDialog();
      })
      .catch((err) => {
        toast.error(
          typeof err === "string" ? err : err?.message || "Something went wrong"
        );
      });
  };

  const handleDeleteSubject = (id: string) => {
    dispatch(deleteSubject(id))
      .unwrap()
      .then((message) => {
        toast.success(
          typeof message === "string" ? message : "Subject deleted successfully"
        );
        dispatch(getSubjects(headerClassId));
      })
      .catch((err) => {
        toast.error(
          typeof err === "string" ? err : err?.message || "Something went wrong"
        );
      });
  };

  const handleEditSubject = (subject: SubjectDto) => {
    setEditMode(true);
    setEditingSubject(subject);
    setSubjectName(subject.subjectName);
    setSubjectCode(subject.subjectCode);
    setSelectedClassId(subject.classId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditMode(false);
    setEditingSubject(null);
    setSubjectName("");
    setSubjectCode("");
    setSelectedClassId(headerClassId);
  };

  const subjectList = Array.isArray(subjects) ? subjects : [];

  return (
    <Box
      sx={{
        p: 0,
        borderRadius: 4,
        minHeight: 250,
        position: "relative",
        background: `linear-gradient(135deg, #667eea 15%, #f8fafc 100%)`,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          px: 2,
          pt: 2,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Chip
          icon={<BookIcon sx={{ color: "#667eea" }} />}
          label="Subjects"
          sx={{
            fontWeight: 700,
            fontSize: 18,
            bgcolor: "#fff",
            color: "#667eea",
            px: 1.5,
            boxShadow: 1,
            mr: 1,
            flexShrink: 0,
          }}
        />

        <FormControl
          size="small"
          sx={{
            minWidth: 20,
            maxWidth: 90,
            flexGrow: 1,
            flexBasis: "150px",
            bgcolor: "#fff",
            borderRadius: 1,
            flexShrink: 1,
          }}
        >
          <InputLabel>Class</InputLabel>
          <Select
            value={headerClassId}
            label="Class"
            onChange={(e) => setHeaderClassId(e.target.value)}
            sx={{
              fontWeight: 600,
              color: "#667eea",
            }}
          >
            {schoolClasses.map((cls) => (
              <MenuItem key={cls.id} value={cls.id!}>
                {cls.className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box flexGrow={1} />

        <Tooltip title="Add Subject" arrow TransitionComponent={Fade}>
          <IconButton
            onClick={() => {
              setSelectedClassId(headerClassId);
              setOpen(true);
            }}
            sx={{
              background: "#667eea",
              color: "#fff",
              borderRadius: "50%",
              boxShadow: 2,
              flexShrink: 0,
              width: 40,
              height: 40,
              "&:hover": {
                background: "#5a67d8",
              },
            }}
            aria-label="add subject"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          maxHeight: 350,
          overflowY: "auto",
          px: 2,
          pb: 2,
        }}
      >
        {subjectList.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 200,
              flexDirection: "column",
              gap: 2,
            }}
          >
            <BookIcon sx={{ fontSize: 48, color: "#94a3b8" }} />
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              No subjects found for this class
            </Typography>
          </Box>
        ) : (
          <List sx={{ padding: 0 }}>
            {subjectList.map((subject, index) => (
              <ListItem
                key={subject.id || index}
                sx={{
                  background: "#fff",
                  borderRadius: 2,
                  mb: 1,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: "#1e293b",
                        }}
                      >
                        {subject.subjectName}
                      </Typography>
                      <Chip
                        label={subject.subjectCode}
                        size="small"
                        sx={{
                          bgcolor: "#667eea",
                          color: "white",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  }
                />
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Tooltip title="Edit Subject" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleEditSubject(subject)}
                      sx={{
                        color: "#667eea",
                        "&:hover": { bgcolor: "#e0e7ff" },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Subject" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteSubject(subject.id)}
                      sx={{
                        color: "#ef4444",
                        "&:hover": { bgcolor: "#fef2f2" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Add/Edit Subject Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          {editMode ? "Edit Subject" : "Add New Subject"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="e.g., Mathematics, English, Science"
            />
            <TextField
              label="Subject Code"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="e.g., MATH101, ENG101, SCI101"
            />
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={selectedClassId}
                label="Class"
                onChange={(e) => setSelectedClassId(e.target.value)}
              >
                {schoolClasses.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id!}>
                    {cls.className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={editMode ? handleUpdateSubject : handleAddSubject}
            variant="contained"
            disabled={loading}
            sx={{
              background: "#667eea",
              "&:hover": {
                background: "#5a67d8",
              },
            }}
          >
            {editMode ? "Update" : "Add"} Subject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
