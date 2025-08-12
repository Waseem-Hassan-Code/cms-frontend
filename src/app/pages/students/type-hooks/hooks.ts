// src/pages/students/hooks/useMockStudents.ts
import { useState, useEffect } from "react";
import type { Filters, Student } from "./type";

const useMockStudents = (filters: Filters) => {
  const [students_, setStudents] = useState<Student[]>([]);
  const [loading_, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockStudents = generateMockStudents();
      let filteredStudents = [...mockStudents];

      if (filters.class) {
        filteredStudents = filteredStudents.filter(
          (s) => s.class === filters.class
        );
      }

      if (filters.section) {
        filteredStudents = filteredStudents.filter(
          (s) => s.section === filters.section
        );
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredStudents = filteredStudents.filter(
          (s) =>
            s.name.toLowerCase().includes(searchLower) ||
            s.rollNumber.toLowerCase().includes(searchLower)
        );
      }

      setStudents(filteredStudents);
      setLoading(false);
    }, 500);
  }, [filters]);

  return { students_, loading_ };
};

const generateMockStudents = (): Student[] => {
  // Generate mock student data
  return Array.from({ length: 50 }, (_, i) => ({
    id: `stu${1000 + i}`,
    name: `Student ${i + 1}`,
    class: `Class ${Math.floor(i / 10) + 1}`,
    section: ["A", "B", "C", "D"][i % 4],
    rollNumber: `${100 + i}`,
    fatherName: `Father ${i + 1}`,
    motherName: `Mother ${i + 1}`,
    contactNumber: `9876543${String(i).padStart(2, "0")}`,
    address: `Address ${i + 1}, City`,
    admissionDate: `2023-01-${String((i % 28) + 1).padStart(2, "0")}`,
    avatar: `https://i.pravatar.cc/150?img=${i % 70}`,
  }));
};

export default useMockStudents;
