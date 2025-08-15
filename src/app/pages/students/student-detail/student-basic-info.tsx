import { Box, Grid, Typography, Avatar, Paper } from "@mui/material";
import type { StudentBasicInfoData } from "../type-hooks/type";
import { formatDateWithoutTime } from "../../../../utilities/date-formatter";
import {
  getInitials,
  stringToColor,
} from "../../../../utilities/avatar-helpers";

interface StudentBasicInfoProps {
  student: StudentBasicInfoData;
}

const StudentBasicInfo = ({ student }: StudentBasicInfoProps) => {
  const initials = getInitials(student.studentName);
  const avatarColor = stringToColor(student.studentName);

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 4,
        background: "linear-gradient(135deg, #f8fafc 0%, #e3f2fd 100%)",
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.07)",
        mb: 3,
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt={student.studentName}
              src={student.studentPhotoUrl || "./src/assets/woman.png"}
              sx={{
                width: 120,
                height: 120,
                border: "3px solid #1976d2",
                bgcolor: avatarColor,
                color: "#fff",
                fontSize: 40,
                fontWeight: 700,
                boxShadow: 3,
              }}
            >
              {!student.studentPhotoUrl && initials}
            </Avatar>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: "primary.main",
              letterSpacing: 1,
              mb: 1,
              fontFamily: "Montserrat, Roboto, Arial, sans-serif",
            }}
          >
            {student.studentName}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 0.5,
                fontSize: { xs: 15, md: 17 },
                fontWeight: 500,
                fontFamily: "Roboto, Arial, sans-serif",
              }}
            >
              <strong>Class:</strong> {student.className} &mdash; Section{" "}
              {student.sectionName}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 0.5,
                fontSize: { xs: 15, md: 17 },
                fontWeight: 500,
                fontFamily: "Roboto, Arial, sans-serif",
              }}
            >
              <strong>Roll Number:</strong> {student.rollNumber}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: 15, md: 17 },
                fontWeight: 500,
                fontFamily: "Roboto, Arial, sans-serif",
              }}
            >
              <strong>Admission Date:</strong>{" "}
              {formatDateWithoutTime(student.admissionDate)}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "primary.dark",
              mb: 1,
              fontFamily: "Montserrat, Roboto, Arial, sans-serif",
              letterSpacing: 0.5,
            }}
          >
            Contact Information
          </Typography>
          <Box sx={{ pl: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 0.5,
                fontSize: { xs: 14, md: 16 },
                fontWeight: 500,
                fontFamily: "Roboto, Arial, sans-serif",
              }}
            >
              <strong>Father:</strong> {student.fatherName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 0.5,
                fontSize: { xs: 14, md: 16 },
                fontWeight: 500,
                fontFamily: "Roboto, Arial, sans-serif",
              }}
            >
              <strong>Mother:</strong> {student.motherName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 0.5,
                fontSize: { xs: 14, md: 16 },
                fontWeight: 500,
                fontFamily: "Roboto, Arial, sans-serif",
              }}
            >
              <strong>Phone:</strong> {student.contactNumber}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: 14, md: 16 },
                fontWeight: 500,
                fontFamily: "Roboto, Arial, sans-serif",
              }}
            >
              <strong>Address:</strong> {student.address}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentBasicInfo;
