// src/pages/admissions/components/AdmissionGrid.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";

import { CustomDataGrid } from "../../components/custom-data-grid";
import type { AppDispatch, RootState } from "../../../redux/store";

import {
  clearStudents,
  setPageNumber,
  setPageSize,
  setStudentId,
} from "../../../redux/student-admission/student-admission-slice";
import { getStudents } from "../../../redux/student-admission/student-admission-thunks";
import { convertUtcToLocal } from "../../../utilities/date-formatter";

const AdmissionGrid = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { students, loading, pageNumber, pageSize, searchString } = useSelector(
    (state: RootState) => state.studentAdmission
  );

  useEffect(() => {
    dispatch(getStudents({ pageNumber, pageSize, searchString }));

    return () => {
      dispatch(clearStudents());
    };
  }, [dispatch, pageNumber, pageSize, searchString]);

  const rows =
    students?.data?.map((student) => ({
      id: student.id || "",
      // registrationNumber: student.registrationNumber,
      createdAt: student.createdAt,
      dateOfBirth: student.dateOfBirth,
      phone: student.phone,
      fatherName: student.fatherName,
      fullName: `${student.firstName || ""} ${student.lastName || ""}`.trim(),
    })) || [];

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
    },
    {
      field: "dateOfBirth",
      headerName: "DOB",
      width: 120,
      type: "date",
      valueFormatter: (params) => convertUtcToLocal(params),
    },
    {
      field: "createdAt",
      headerName: "Admission Date",
      width: 150,
      type: "date",
      valueFormatter: (params) => convertUtcToLocal(params),
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
        <CustomDataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 20, 50, 100]}
          serverSidePagination
          totalRows={students?.totalRecords || 0}
          loading={loading}
          getRowId={(row) => row.registrationNumber}
          onRowClick={(params) => {
            dispatch(setStudentId(params.row.id));
          }}
          initialState={{
            pagination: {
              paginationModel: {
                page: pageNumber - 1,
                pageSize: pageSize,
              },
            },
          }}
          onPaginationModelChange={(model) => {
            dispatch(setPageNumber(model.page + 1));
            dispatch(setPageSize(model.pageSize));
          }}
        />
      </Box>
    </Paper>
  );
};

export default AdmissionGrid;
