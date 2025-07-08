// src/pages/students/components/StudentGrid.tsx
import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
} from "@mui/x-data-grid";
import { Box, Paper } from "@mui/material";
import type { Filters, Student } from "./type-hooks/type";
import useMockStudents from "./type-hooks/hooks";

interface StudentGridProps {
  filters: Filters;
  onRowClick: (student: Student) => void;
}

const StudentGrid = ({ filters, onRowClick }: StudentGridProps) => {
  const { students, loading } = useMockStudents(filters);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "class", headerName: "Class", width: 120 },
    { field: "section", headerName: "Section", width: 100 },
    { field: "rollNumber", headerName: "Roll No.", width: 100 },
    { field: "fatherName", headerName: "Father's Name", width: 200 },
    { field: "contactNumber", headerName: "Contact", width: 150 },
  ];

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ maxHeight: 600, width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          loading={loading}
          onRowClick={(params: GridRowParams) =>
            onRowClick(params.row as Student)
          }
          sx={{
            "& .MuiDataGrid-row": {
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
              },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default StudentGrid;
