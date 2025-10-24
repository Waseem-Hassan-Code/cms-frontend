import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Collapse,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  CircularProgress,
  TextField,
  FormHelperText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  getResultCardsByStudentId,
  deleteResultCard,
  createResultCard,
  updateResultCard,
  updateResultEntry,
  createResultEntry,
} from "../../../../../redux/result-cards/result-card-thunk";
import { getStudentDetailByStudentId } from "../../../../../redux/enrolled-students/enrolled-student-thunk";
import type {
  ResultCardDto,
  CreateResultCardDto,
  UpdateResultCardDto,
  CreateResultEntryDto,
} from "../../../../../models/school-settings";
import type { RootState, AppDispatch } from "../../../../../redux/store";
import { cms_base_api } from "../../../../../app/middleware/cms-base-api";

const StudentReportCardPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const studentId = id;
  const dispatch = useDispatch<AppDispatch>();

  const { studentResultCards, loading } = useSelector(
    (state: RootState) => state.resultCards
  );

  const { studentDetails } = useSelector(
    (state: RootState) => state.enrolledStudents
  );

  // Use studentResultCards instead of resultCards for this component, with safety check
  const resultCards = studentResultCards || [];

  const [expandedExam, setExpandedExam] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resultCardToDelete, setResultCardToDelete] = useState<string | null>(
    null
  );

  // Add Result Card Dialog state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [remarks, setRemarks] = useState("");

  // Form validation errors
  const [examTitleError, setExamTitleError] = useState("");
  const [examDateError, setExamDateError] = useState("");

  // Edit Result Card Dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingResultCard, setEditingResultCard] =
    useState<ResultCardDto | null>(null);

  // State for adding result entry
  const [addingEntryCardId, setAddingEntryCardId] = useState<string | null>(
    null
  );
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [newEntry, setNewEntry] = useState<{
    subjectId: string;
    obtainedMarks: string;
    totalMarks: string;
  }>({
    subjectId: "",
    obtainedMarks: "",
    totalMarks: "",
  });
  const [entryLoading, setEntryLoading] = useState(false);

  useEffect(() => {
    if (studentId) {
      dispatch(getResultCardsByStudentId(studentId));
      dispatch(getStudentDetailByStudentId({ id: studentId }));
    }
  }, [dispatch, studentId]);

  const toggleExpand = (id: string) =>
    setExpandedExam(expandedExam === id ? null : id);

  // Validation functions
  const validateExamTitle = (value: string) => {
    if (!value.trim()) {
      setExamTitleError("Exam title is required");
      return false;
    }
    if (value.trim().length < 3) {
      setExamTitleError("Exam title must be at least 3 characters");
      return false;
    }
    setExamTitleError("");
    return true;
  };

  const validateExamDate = (value: string) => {
    if (!value) {
      setExamDateError("Exam date is required");
      return false;
    }
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setExamDateError("Exam date cannot be in the future");
      return false;
    }
    setExamDateError("");
    return true;
  };

  // Form change handlers with validation
  const handleExamTitleChange = (value: string) => {
    setExamTitle(value);
    validateExamTitle(value);
  };

  const handleExamDateChange = (value: string) => {
    setExamDate(value);
    validateExamDate(value);
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      examTitle.trim().length >= 3 &&
      examDate &&
      !examTitleError &&
      !examDateError &&
      studentId &&
      studentDetails?.data?.classId
    );
  };

  const handleDeleteResultCard = async (id: string) => {
    try {
      const result = await dispatch(deleteResultCard(id));

      if (deleteResultCard.fulfilled.match(result)) {
        toast.success("Result card deleted successfully!");
        setDeleteDialogOpen(false);
        setResultCardToDelete(null);
        // Refresh the data
        if (studentId) {
          dispatch(getResultCardsByStudentId(studentId));
        }
      } else {
        toast.error("Failed to delete result card");
      }
    } catch (error) {
      console.error("Error deleting result card:", error);
      toast.error("Failed to delete result card");
    }
  };

  const handleAddResultCard = async () => {
    // Validate all fields
    const isTitleValid = validateExamTitle(examTitle);
    const isDateValid = validateExamDate(examDate);

    if (!isTitleValid || !isDateValid) {
      return;
    }

    if (!studentId) {
      toast.error("Student ID is missing. Please navigate back and try again.");
      return;
    }

    if (!studentDetails?.data?.classId) {
      toast.error(
        "Student class information not found. Please refresh the page."
      );
      return;
    }

    const resultCardData: CreateResultCardDto = {
      examTitle: examTitle.trim(),
      examDate: examDate,
      studentId: studentId,
      classId: studentDetails.data.classId,
      remarks: remarks.trim(),
      resultEntries: [], // Empty array for now - entries can be added later via edit
    };

    try {
      console.log("Sending result card data:", resultCardData);
      const result = await dispatch(createResultCard(resultCardData));

      if (createResultCard.fulfilled.match(result)) {
        toast.success("Result card created successfully!");
        handleCloseAddDialog();
        // Refresh the data
        if (studentId) {
          dispatch(getResultCardsByStudentId(studentId));
        }
      } else {
        const errorMessage = result.payload as string;
        console.error("Create result card failed:", errorMessage);
        toast.error(`Failed to create result card: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error creating result card:", error);
      toast.error("An unexpected error occurred while creating result card");
    }
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setExamTitle("");
    setExamDate("");
    setRemarks("");
    setExamTitleError("");
    setExamDateError("");
  };

  const handleEditResultCard = (resultCard: ResultCardDto) => {
    setEditingResultCard(resultCard);
    setExamTitle(resultCard.examTitle);
    setExamDate(resultCard.examDate.split("T")[0]); // Convert to date input format
    setRemarks(resultCard.remarks);
    setEditDialogOpen(true);
  };

  const handleUpdateResultCard = async () => {
    if (!editingResultCard || !examTitle.trim() || !examDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updateData: UpdateResultCardDto = {
      id: editingResultCard.id,
      examTitle: examTitle.trim(),
      examDate: examDate,
      remarks: remarks.trim(),
    };

    try {
      const result = await dispatch(updateResultCard(updateData));

      if (updateResultCard.fulfilled.match(result)) {
        toast.success("Result card updated successfully!");
        handleCloseEditDialog();
        // Refresh the data
        if (studentId) {
          dispatch(getResultCardsByStudentId(studentId));
        }
      } else {
        toast.error("Failed to update result card");
      }
    } catch (error) {
      console.error("Error updating result card:", error);
      toast.error("Failed to update result card");
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingResultCard(null);
    setExamTitle("");
    setExamDate("");
    setRemarks("");
  };

  // State for adding result entry
  const fetchSubjectsForClass = async (classId: string) => {
    try {
      const res = await cms_base_api.get(`/Subjects/class/${classId}`);
      if (Array.isArray(res.data?.data)) {
        setSubjects(
          res.data.data.map((s: any) => ({
            id: s.id,
            name: s.subjectName || s.name,
          }))
        );
      } else {
        setSubjects([]);
      }
    } catch {
      setSubjects([]);
    }
  };

  // Handle add row button click
  const handleAddRowClick = async (resultCard: ResultCardDto) => {
    setAddingEntryCardId(resultCard.id);
    setNewEntry({ subjectId: "", obtainedMarks: "", totalMarks: "" });
    await fetchSubjectsForClass(resultCard.classId);
  };

  // Handle save entry
  const handleSaveEntry = async (resultCard: ResultCardDto) => {
    if (
      !newEntry.subjectId ||
      !newEntry.obtainedMarks ||
      !newEntry.totalMarks
    ) {
      toast.error("Please fill all entry fields");
      return;
    }
    setEntryLoading(true);
    try {
      const entryPayload = {
        subjectId: newEntry.subjectId,
        obtainedMarks: Number(newEntry.obtainedMarks),
        totalMarks: Number(newEntry.totalMarks),
      } as CreateResultEntryDto;
      const result = await dispatch(
        createResultEntry({ id: addingEntryCardId!, data: entryPayload })
      );
      if (createResultEntry.fulfilled.match(result)) {
        toast.success("Result entry added");
        setAddingEntryCardId(null);
        if (studentId) dispatch(getResultCardsByStudentId(studentId));
      } else {
        toast.error("Failed to add entry");
      }
    } finally {
      setEntryLoading(false);
    }
  };

  const calculateSummary = (resultCard: ResultCardDto) => {
    const totalMarks = resultCard.totalMarks;
    const obtained = resultCard.obtainedMarks;
    const percentage = resultCard.percentage.toFixed(2);
    const status = resultCard.percentage >= 40 ? "Pass" : "Fail";
    return { totalMarks, obtained, percentage, status };
  };

  const handlePrintExam = (resultCard: ResultCardDto) => {
    const printContent = `
      <h2>${resultCard.examTitle} - ${new Date(
      resultCard.examDate
    ).toLocaleDateString()}</h2>
      <p><b>Student ID:</b> ${resultCard.studentId} | <b>Class ID:</b> ${
      resultCard.classId
    }</p>
      <table border="1" cellspacing="0" cellpadding="8" width="100%">
        <tr>
          <th>Exam</th>
          <th>Marks Obtained</th>
          <th>Total Marks</th>
          <th>Percentage</th>
          <th>Grade</th>
          <th>Status</th>
        </tr>
        <tr style="background:${
          resultCard.percentage >= 40 ? "inherit" : "#ffd6d6"
        }">
          <td>${resultCard.examTitle}</td>
          <td>${resultCard.obtainedMarks}</td>
          <td>${resultCard.totalMarks}</td>
          <td>${resultCard.percentage}%</td>
          <td>${resultCard.grade}</td>
          <td>${resultCard.percentage >= 40 ? "Pass" : "Fail"}</td>
        </tr>
      </table>
      <p><b>Remarks:</b> ${resultCard.remarks || "No remarks"}</p>
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.print();
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Back + Print All Buttons */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ borderRadius: 3 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          color="secondary"
          sx={{ borderRadius: 3 }}
        >
          Print All Reports
        </Button>
      </Box>

      {/* Student Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Report Cards
        </Typography>
        <Typography color="text.secondary">
          Student ID: <b>{studentId}</b>
        </Typography>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Result Cards */}
      {!loading &&
        resultCards &&
        resultCards.length > 0 &&
        resultCards.map((resultCard: ResultCardDto) => {
          const summary = calculateSummary(resultCard);

          return (
            <Paper key={resultCard.id} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
              {/* Result Card Header */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                onClick={() => toggleExpand(resultCard.id)}
                sx={{ cursor: "pointer" }}
              >
                <Box>
                  <Typography variant="h6">{resultCard.examTitle}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(resultCard.examDate).toLocaleDateString()} -
                    Grade: {resultCard.grade}
                  </Typography>
                </Box>
                {expandedExam === resultCard.id ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </Box>

              {/* Expandable Section */}
              <Collapse
                in={expandedExam === resultCard.id}
                timeout="auto"
                unmountOnExit
              >
                <Table sx={{ mt: 2 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exam Title</TableCell>
                      <TableCell>Marks Obtained</TableCell>
                      <TableCell>Total Marks</TableCell>
                      <TableCell>Percentage</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Remarks</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        backgroundColor:
                          resultCard.percentage < 40 ? "#ffe5e5" : "inherit",
                      }}
                    >
                      <TableCell>{resultCard.examTitle}</TableCell>
                      <TableCell>{resultCard.obtainedMarks}</TableCell>
                      <TableCell>{resultCard.totalMarks}</TableCell>
                      <TableCell>{resultCard.percentage}%</TableCell>
                      <TableCell>{resultCard.grade}</TableCell>
                      <TableCell>
                        <Tooltip
                          title={resultCard.remarks || "No remarks"}
                          arrow
                        >
                          <span>
                            {resultCard.remarks
                              ? `${resultCard.remarks.slice(0, 20)}...`
                              : "No remarks"}
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleEditResultCard(resultCard)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setResultCardToDelete(resultCard.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* Summary */}
                    <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                      <TableCell>
                        <b>Summary</b>
                      </TableCell>
                      <TableCell>
                        <b>{summary.obtained}</b>
                      </TableCell>
                      <TableCell>
                        <b>{summary.totalMarks}</b>
                      </TableCell>
                      <TableCell colSpan={4} align="right">
                        <Typography
                          fontWeight={600}
                          color={
                            summary.status === "Pass"
                              ? "success.main"
                              : "error.main"
                          }
                        >
                          {summary.percentage}% - {summary.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    color="primary"
                    sx={{ borderRadius: 3 }}
                    onClick={() => handlePrintExam(resultCard)}
                  >
                    Print This Report
                  </Button>
                </Box>

                {/* Add Row Button */}
                <Box
                  sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  {addingEntryCardId !== resultCard.id ? (
                    <Button
                      variant="outlined"
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={() => handleAddRowClick(resultCard)}
                      size="small"
                    >
                      Add Row
                    </Button>
                  ) : null}
                </Box>

                {/* Add Entry Row */}
                {addingEntryCardId === resultCard.id && (
                  <Box
                    sx={{
                      mt: 2,
                      mb: 2,
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      select
                      label="Subject"
                      value={newEntry.subjectId}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, subjectId: e.target.value })
                      }
                      SelectProps={{ native: true }}
                      size="small"
                      sx={{ minWidth: 180 }}
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      label="Obtained Marks"
                      type="number"
                      value={newEntry.obtainedMarks}
                      onChange={(e) =>
                        setNewEntry({
                          ...newEntry,
                          obtainedMarks: e.target.value,
                        })
                      }
                      size="small"
                      sx={{ width: 120 }}
                    />
                    <TextField
                      label="Total Marks"
                      type="number"
                      value={newEntry.totalMarks}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, totalMarks: e.target.value })
                      }
                      size="small"
                      sx={{ width: 120 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={() => handleSaveEntry(resultCard)}
                      disabled={entryLoading}
                      size="small"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      startIcon={<CancelIcon />}
                      onClick={() => setAddingEntryCardId(null)}
                      disabled={entryLoading}
                      size="small"
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Collapse>
            </Paper>
          );
        })}

      {/* No Data Message */}
      {!loading && (!resultCards || resultCards.length === 0) && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No result cards found for this student
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Add a new result card to get started
          </Typography>
        </Paper>
      )}

      {/* Add New Result Card FAB */}
      <Fab
        color="primary"
        aria-label="add result card"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={() => setAddDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Result Card</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this result card? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() =>
              resultCardToDelete && handleDeleteResultCard(resultCardToDelete)
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Result Card Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={handleCloseAddDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Result Card</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            {/* Student and Class Info */}
            <Box sx={{ p: 2, bgcolor: "#f8f9fa", borderRadius: 1, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Student:</strong>{" "}
                {studentDetails?.data?.studentName || "Loading..."} |
                <strong> Class:</strong>{" "}
                {studentDetails?.data?.className || "Loading..."} |
                <strong> Section:</strong>{" "}
                {studentDetails?.data?.sectionName || "Loading..."}
              </Typography>
            </Box>

            <Box>
              <TextField
                label="Exam Title"
                value={examTitle}
                onChange={(e) => handleExamTitleChange(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="e.g., Mid Term Exam, Final Exam"
                required
                error={!!examTitleError}
              />
              {examTitleError && (
                <FormHelperText error sx={{ ml: 0 }}>
                  {examTitleError}
                </FormHelperText>
              )}
            </Box>

            <Box>
              <TextField
                label="Exam Date"
                type="date"
                value={examDate}
                onChange={(e) => handleExamDateChange(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                error={!!examDateError}
              />
              {examDateError && (
                <FormHelperText error sx={{ ml: 0 }}>
                  {examDateError}
                </FormHelperText>
              )}
            </Box>
            <TextField
              label="General Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              placeholder="Overall performance remarks..."
            />

            {/* Result Entries Section */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Subject Results
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Note: This is a simplified form. In a full implementation, you
              would select subjects and enter marks for each.
            </Typography>
            <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
              <Typography variant="body2">
                For this demo, result entries can be added after creating the
                result card via edit functionality.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseAddDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleAddResultCard}
            variant="contained"
            disabled={loading}
            color="primary"
          >
            Add Result Card
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Result Card Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Result Card</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Exam Title"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="e.g., Mid Term Exam, Final Exam"
              required
            />
            <TextField
              label="Exam Date"
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              label="General Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              placeholder="Overall performance remarks..."
            />

            {/* Current Result Info */}
            {editingResultCard && (
              <Box sx={{ mt: 2, p: 2, bgcolor: "#f0f0f0", borderRadius: 1 }}>
                <Typography variant="h6">Current Result Summary</Typography>
                <Typography variant="body2">
                  Total Marks: {editingResultCard.totalMarks} | Obtained:{" "}
                  {editingResultCard.obtainedMarks} | Percentage:{" "}
                  {editingResultCard.percentage}% | Grade:{" "}
                  {editingResultCard.grade}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Note: To edit individual subject marks, use the result entries
                  management feature.
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseEditDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateResultCard}
            variant="contained"
            disabled={loading || !examTitle.trim() || !examDate}
            color="primary"
          >
            Update Result Card
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentReportCardPage;
