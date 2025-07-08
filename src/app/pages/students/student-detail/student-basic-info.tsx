// src/pages/students/components/StudentBasicInfo.tsx
import { Box, Grid, Typography, Avatar } from "@mui/material";
import type { Student } from "../type-hooks/type";

interface StudentBasicInfoProps {
  student: Student;
}

const StudentBasicInfo = ({ student }: StudentBasicInfoProps) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 2 }}>
        <Avatar
          alt={student.name}
          src={student.avatar}
          sx={{ width: 120, height: 120, border: "2px solid #1976d2" }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography variant="h6" gutterBottom>
          {student.name}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Class: {student.class} - Section {student.section}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Roll Number: {student.rollNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Admission Date: {student.admissionDate}
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography variant="subtitle1" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Father: {student.fatherName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mother: {student.motherName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {student.contactNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {student.address}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StudentBasicInfo;
