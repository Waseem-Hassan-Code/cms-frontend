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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getResultCardsByStudentId,
  deleteResultCard,
  createResultCard,
  updateResultCard,
} from "../../../../../redux/result-cards/result-card-thunk";
import type {
  ResultCardDto,
  CreateResultCardDto,
  UpdateResultCardDto,
} from "../../../../../models/school-settings";
import type { RootState, AppDispatch } from "../../../../../redux/store";

const StudentReportCardPage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { resultCards, loading } = useSelector(
    (state: RootState) => state.resultCards
  );

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
  const [resultEntries, setResultEntries] = useState<
    {
      subjectId: string;
      totalMarks: number;
      obtainedMarks: number;
      remarks: string;
    }[]
  >([]);

  // Edit Result Card Dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingResultCard, setEditingResultCard] =
    useState<ResultCardDto | null>(null);

  useEffect(() => {
    if (studentId) {
      dispatch(getResultCardsByStudentId(studentId));
    }
  }, [dispatch, studentId]);

  const toggleExpand = (id: string) =>
    setExpandedExam(expandedExam === id ? null : id);

  const handleDeleteResultCard = async (id: string) => {
    try {
      await dispatch(deleteResultCard(id));
      setDeleteDialogOpen(false);
      setResultCardToDelete(null);
      // Refresh the data
      if (studentId) {
        dispatch(getResultCardsByStudentId(studentId));
      }
    } catch (error) {
      console.error("Error deleting result card:", error);
    }
  };

  const handleAddResultCard = async () => {
    if (!examTitle.trim() || !examDate || !studentId) {
      console.error("Please fill in all required fields");
      return;
    }

    const resultCardData: CreateResultCardDto = {
      examTitle: examTitle.trim(),
      examDate: examDate,
      studentId: studentId,
      classId: "defaultClassId", // This should come from student data
      remarks: remarks.trim(),
      resultEntries: resultEntries.map((entry) => ({
        subjectId: entry.subjectId,
        totalMarks: entry.totalMarks,
        obtainedMarks: entry.obtainedMarks,
        remarks: entry.remarks,
      })),
    };

    try {
      await dispatch(createResultCard(resultCardData));
      handleCloseAddDialog();
      // Refresh the data
      if (studentId) {
        dispatch(getResultCardsByStudentId(studentId));
      }
    } catch (error) {
      console.error("Error creating result card:", error);
    }
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setExamTitle("");
    setExamDate("");
    setRemarks("");
    setResultEntries([]);
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
      console.error("Please fill in all required fields");
      return;
    }

    const updateData: UpdateResultCardDto = {
      id: editingResultCard.id,
      examTitle: examTitle.trim(),
      examDate: examDate,
      remarks: remarks.trim(),
    };

    try {
      await dispatch(updateResultCard(updateData));
      handleCloseEditDialog();
      // Refresh the data
      if (studentId) {
        dispatch(getResultCardsByStudentId(studentId));
      }
    } catch (error) {
      console.error("Error updating result card:", error);
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingResultCard(null);
    setExamTitle("");
    setExamDate("");
    setRemarks("");
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
              </Collapse>
            </Paper>
          );
        })}

      {/* No Data Message */}
      {!loading && resultCards.length === 0 && (
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
            disabled={loading || !examTitle.trim() || !examDate}
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
