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
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "#f5f7fa",
      }}
    >
      <Box
        sx={{
          maxHeight: "600px",
          overflow: "auto",
          width: "100%",
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 8, page: 0 } },
          }}
          loading={loading}
          onRowClick={(params: GridRowParams) =>
            onRowClick(params.row as Student)
          }
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "none",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              //   color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },

            "& .MuiDataGrid-row": {
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #e0e0e0",
            },

            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#fafafa",
            },

            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#f0f0f0",
              borderTop: "1px solid #e0e0e0",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default StudentGrid;
