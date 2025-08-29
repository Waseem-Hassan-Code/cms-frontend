import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Collapse,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router-dom";

interface Subject {
  id: number;
  name: string;
  marksObtained: number;
  totalMarks: number;
  remarks: string;
}

interface Exam {
  id: number;
  name: string;
  date: string;
  subjects: Subject[];
}

const StudentReportCardPage = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      name: "Mid Term Exam",
      date: "2024-12-01",
      subjects: [
        {
          id: 1,
          name: "Math",
          marksObtained: 45,
          totalMarks: 100,
          remarks: "Needs improvement in problem solving.",
        },
        {
          id: 2,
          name: "Science",
          marksObtained: 72,
          totalMarks: 100,
          remarks: "Good grasp of concepts.",
        },
        {
          id: 3,
          name: "English",
          marksObtained: 60,
          totalMarks: 100,
          remarks: "Fair vocabulary skills.",
        },
        {
          id: 4,
          name: "Urdu",
          marksObtained: 35,
          totalMarks: 100,
          remarks: "Struggles with comprehension.",
        },
      ],
    },
    {
      id: 2,
      name: "Final Exam",
      date: "2025-03-15",
      subjects: [
        {
          id: 5,
          name: "Math",
          marksObtained: 85,
          totalMarks: 100,
          remarks: "Excellent performance.",
        },
        {
          id: 6,
          name: "Science",
          marksObtained: 92,
          totalMarks: 100,
          remarks: "Outstanding knowledge.",
        },
        {
          id: 7,
          name: "English",
          marksObtained: 76,
          totalMarks: 100,
          remarks: "Shows good improvement.",
        },
      ],
    },
  ]);

  const [expandedExam, setExpandedExam] = useState<number | null>(null);
  const [editingSubject, setEditingSubject] = useState<number | null>(null);

  const toggleExpand = (id: number) =>
    setExpandedExam(expandedExam === id ? null : id);

  const handleMarksChange = (
    examId: number,
    subjectId: number,
    field: keyof Subject,
    value: string | number
  ) => {
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === examId
          ? {
              ...exam,
              subjects: exam.subjects.map((s) =>
                s.id === subjectId ? { ...s, [field]: value } : s
              ),
            }
          : exam
      )
    );
  };

  const calculateSummary = (subjects: Subject[]) => {
    const totalMarks = subjects.reduce((sum, s) => sum + s.totalMarks, 0);
    const obtained = subjects.reduce((sum, s) => sum + s.marksObtained, 0);
    const percentage = ((obtained / totalMarks) * 100).toFixed(2);
    const failed = subjects.filter((s) => s.marksObtained < 40).length;
    const status = failed > 0 ? "Fail" : "Pass";
    return { totalMarks, obtained, percentage, failed, status };
  };

  const handlePrintExam = (exam: Exam) => {
    const printContent = `
      <h2>${exam.name} - ${exam.date}</h2>
      <p><b>Student:</b> Ali Khan | <b>Class:</b> 10-B</p>
      <table border="1" cellspacing="0" cellpadding="8" width="100%">
        <tr>
          <th>Subject</th>
          <th>Marks Obtained</th>
          <th>Total Marks</th>
          <th>Remarks</th>
        </tr>
        ${exam.subjects
          .map(
            (s) => `
          <tr style="background:${
            s.marksObtained < 40 ? "#ffd6d6" : "inherit"
          }">
            <td>${s.name}</td>
            <td>${s.marksObtained}</td>
            <td>${s.totalMarks}</td>
            <td>${s.remarks}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.print();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
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

      {exams.map((exam) => {
        const summary = calculateSummary(exam.subjects);

        return (
          <Paper key={exam.id} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
            {/* Exam Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => toggleExpand(exam.id)}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="h6">{exam.name}</Typography>
              {expandedExam === exam.id ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </Box>

            {/* Expandable Section */}
            <Collapse
              in={expandedExam === exam.id}
              timeout="auto"
              unmountOnExit
            >
              <Table sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Marks Obtained</TableCell>
                    <TableCell>Total Marks</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exam.subjects.map((subj) => (
                    <TableRow
                      key={subj.id}
                      sx={{
                        backgroundColor:
                          subj.marksObtained < 40 ? "#ffe5e5" : "inherit",
                      }}
                    >
                      <TableCell>{subj.name}</TableCell>
                      <TableCell>
                        {editingSubject === subj.id ? (
                          <TextField
                            type="number"
                            value={subj.marksObtained}
                            onChange={(e) =>
                              handleMarksChange(
                                exam.id,
                                subj.id,
                                "marksObtained",
                                +e.target.value
                              )
                            }
                            size="small"
                          />
                        ) : (
                          subj.marksObtained
                        )}
                      </TableCell>
                      <TableCell>{subj.totalMarks}</TableCell>
                      <TableCell>
                        {editingSubject === subj.id ? (
                          <TextField
                            value={subj.remarks}
                            onChange={(e) =>
                              handleMarksChange(
                                exam.id,
                                subj.id,
                                "remarks",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                        ) : (
                          <Tooltip title={subj.remarks} arrow>
                            <span>{subj.remarks.slice(0, 20)}...</span>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {editingSubject === subj.id ? (
                          <IconButton onClick={() => setEditingSubject(null)}>
                            <SaveIcon color="success" />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => setEditingSubject(subj.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

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
                    <TableCell colSpan={2} align="right">
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
                  onClick={() => handlePrintExam(exam)}
                >
                  Print This Report
                </Button>
              </Box>
            </Collapse>
          </Paper>
        );
      })}
    </Container>
  );
};

export default StudentReportCardPage;
