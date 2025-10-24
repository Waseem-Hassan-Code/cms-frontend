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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  getResultCardsByStudentId,
  deleteResultCard,
} from "../../../../redux/school-settings/result-cards/result-card-thunk";
import { ResultCardDto } from "../../../../models/school-settings";

const StudentReportCardPage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const dispatch = useAppDispatch();
  
  const { resultCards, loading } = useAppSelector((state) => state.resultCards);
  
  const [expandedExam, setExpandedExam] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resultCardToDelete, setResultCardToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (studentId) {
      dispatch(getResultCardsByStudentId(parseInt(studentId)));
    }
  }, [dispatch, studentId]);

  const toggleExpand = (id: number) =>
    setExpandedExam(expandedExam === id ? null : id);

  const handleDeleteResultCard = async (id: number) => {
    try {
      await dispatch(deleteResultCard(id));
      setDeleteDialogOpen(false);
      setResultCardToDelete(null);
      // Refresh the data
      if (studentId) {
        dispatch(getResultCardsByStudentId(parseInt(studentId)));
      }
    } catch (error) {
      console.error("Error deleting result card:", error);
    }
  };

  const calculateSummary = (resultCard: ResultCardDto) => {
    const totalMarks = resultCard.totalMarks;
    const obtained = resultCard.marksObtained;
    const percentage = ((obtained / totalMarks) * 100).toFixed(2);
    const status = resultCard.isPassed ? "Pass" : "Fail";
    return { totalMarks, obtained, percentage, status };
  };

  const handlePrintExam = (resultCard: ResultCardDto) => {
    const printContent = `
      <h2>${resultCard.examName} - ${new Date(resultCard.examDate).toLocaleDateString()}</h2>
      <p><b>Student ID:</b> ${resultCard.studentId} | <b>Subject:</b> ${resultCard.subjectName}</p>
      <table border="1" cellspacing="0" cellpadding="8" width="100%">
        <tr>
          <th>Subject</th>
          <th>Marks Obtained</th>
          <th>Total Marks</th>
          <th>Percentage</th>
          <th>Grade</th>
          <th>Status</th>
        </tr>
        <tr style="background:${resultCard.isPassed ? "inherit" : "#ffd6d6"}">
          <td>${resultCard.subjectName}</td>
          <td>${resultCard.marksObtained}</td>
          <td>${resultCard.totalMarks}</td>
          <td>${resultCard.percentage}%</td>
          <td>${resultCard.grade}</td>
          <td>${resultCard.isPassed ? "Pass" : "Fail"}</td>
        </tr>
      </table>
      <p><b>Teacher Remarks:</b> ${resultCard.teacherRemarks || "No remarks"}</p>
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
          Student: <b>Ali Khan</b> | Class: <b>10-B</b>
        </Typography>
      </Box>

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
      {!loading && resultCards.map((resultCard: ResultCardDto) => {
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
                <Typography variant="h6">{resultCard.examName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(resultCard.examDate).toLocaleDateString()} - {resultCard.subjectName}
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
                    <TableCell>Subject</TableCell>
                    <TableCell>Marks Obtained</TableCell>
                    <TableCell>Total Marks</TableCell>
                    <TableCell>Percentage</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell>Teacher Remarks</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      backgroundColor: !resultCard.isPassed ? "#ffe5e5" : "inherit",
                    }}
                  >
                    <TableCell>{resultCard.subjectName}</TableCell>
                    <TableCell>{resultCard.marksObtained}</TableCell>
                    <TableCell>{resultCard.totalMarks}</TableCell>
                    <TableCell>{resultCard.percentage}%</TableCell>
                    <TableCell>{resultCard.grade}</TableCell>
                    <TableCell>
                      <Tooltip title={resultCard.teacherRemarks || "No remarks"} arrow>
                        <span>
                          {resultCard.teacherRemarks 
                            ? `${resultCard.teacherRemarks.slice(0, 20)}...`
                            : "No remarks"
                          }
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        onClick={() => {
                          // TODO: Open edit dialog
                          console.log("Edit result card:", resultCard.id);
                        }}
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
        onClick={() => {
          // TODO: Open add result card dialog
          console.log("Add new result card");
        }}
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
            Are you sure you want to delete this result card? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            color="error" 
            variant="contained"
            onClick={() => resultCardToDelete && handleDeleteResultCard(resultCardToDelete)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentReportCardPage;
