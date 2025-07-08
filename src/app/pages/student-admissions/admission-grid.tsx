// src/pages/admissions/components/AdmissionGrid.tsx
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Paper } from "@mui/material";
import useMockAdmissions from "./types-hooks/data-hook";

const AdmissionGrid = () => {
  const { admissions, loading } = useMockAdmissions();

  const columns: GridColDef[] = [
    {
      field: "registrationNumber",
      headerName: "Reg No.",
      width: 120,
    },
    {
      field: "fullName",
      headerName: "Name",
      width: 200,
      valueGetter: (params: any) => {
        if (!params?.row) return "";
        return `${params.row.firstName || ""} ${
          params.row.lastName || ""
        }`.trim();
      },
    },
    {
      field: "dateOfBirth",
      headerName: "DOB",
      width: 120,
      type: "date",
      valueGetter: (params: any) => {
        if (!params?.row?.dateOfBirth) return null;
        return new Date(params.row.dateOfBirth);
      },
    },
    {
      field: "admissionDate",
      headerName: "Admission Date",
      width: 150,
      type: "date",
      valueGetter: (params: any) => {
        if (!params?.row?.admissionDate) return null;
        return new Date(params.row.admissionDate);
      },
    },
    {
      field: "fatherName",
      headerName: "Father's Name",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Contact",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            px: 1.2,
            py: 0.5,
            borderRadius: 1,
            backgroundColor:
              params.value === "Active" ? "success.light" : "error.light",
            color: params.value === "Active" ? "success.dark" : "error.dark",
            textAlign: "center",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          {params.value || "N/A"}
        </Box>
      ),
    },
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
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={admissions || []}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          loading={loading}
          disableColumnMenu
          hideFooterSelectedRowCount
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
            border: "none",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",

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
              fontSize: "0.875rem",
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

export default AdmissionGrid;
