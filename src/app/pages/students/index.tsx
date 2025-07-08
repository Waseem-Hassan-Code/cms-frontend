// src/pages/students/StudentPage.tsx
import { useState } from "react";
import { Box, Container } from "@mui/material";
import StudentFilters from "./student-filters";
import StudentGrid from "./student-grid";
import StudentDetail from "./student-detail/student-detail";
import type { Student } from "./type-hooks/type";

const StudentPage = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filters, setFilters] = useState({
    class: "",
    section: "",
    search: "",
  });

  const handleRowClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleBackClick = () => {
    setSelectedStudent(null);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {!selectedStudent ? (
        <>
          <StudentFilters filters={filters} setFilters={setFilters} />
          <Box sx={{ mt: 3 }}>
            <StudentGrid filters={filters} onRowClick={handleRowClick} />
          </Box>
        </>
      ) : (
        <StudentDetail student={selectedStudent} onBack={handleBackClick} />
      )}
    </Container>
  );
};

export default StudentPage;
