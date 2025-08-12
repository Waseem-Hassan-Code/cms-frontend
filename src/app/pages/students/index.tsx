// src/pages/students/StudentPage.tsx
import { useState } from "react";
import { Box, Container } from "@mui/material";
import StudentGrid from "./student-grid";
import StudentDetail from "./student-detail/student-detail";
import type { Student } from "./type-hooks/type";
import StudentFilters from "./student-filters";

const StudentPage = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleBackClick = () => {
    setSelectedStudent(null);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {!selectedStudent ? (
        <>
          <StudentFilters />
          <Box sx={{ mt: 3 }}>
            <StudentGrid />
          </Box>
        </>
      ) : (
        <StudentDetail student={selectedStudent} onBack={handleBackClick} />
      )}
    </Container>
  );
};

export default StudentPage;
