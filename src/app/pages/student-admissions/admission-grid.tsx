// src/pages/admissions/components/AdmissionGrid.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";

import { CustomDataGrid } from "../../components/custom-data-grid";
import type { AppDispatch, RootState } from "../../../redux/store";

import {
  clearStudents,
  setPageNumber,
  setPageSize,
  setStudentId,
} from "../../../redux/student-admission/student-admission-slice";
import {
  getStudents,
  getStudentVoucher,
} from "../../../redux/student-admission/student-admission-thunks";
import {
  convertUtcToLocal,
  formatDateWithoutTime,
} from "../../../utilities/date-formatter";
import { AdmitStudentDialog } from "../../components/admit-student";
import { generateFeeVoucherPdf } from "../../../utilities/voucher-pdf";
import { toast } from "sonner";

const AdmissionGrid = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    students,
    loading,
    pageNumber,
    pageSize,
    searchString,
    studentVoucher,
  } = useSelector((state: RootState) => state.studentAdmission);

  useEffect(() => {
    dispatch(getStudents({ pageNumber, pageSize, searchString }));

    return () => {
      dispatch(clearStudents());
    };
  }, [dispatch, pageNumber, pageSize, searchString]);

  const handlePrintClick = (id: string) => {
    dispatch(getStudentVoucher(id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        generateFeeVoucherPdf(studentVoucher?.data!);
      } else {
        toast.error("Failed to generate fee voucher");
      }
    });
  };

  const rows =
    students?.data?.map((student) => ({
      id: student.id || "",
      registrationNumber: student.registrationNumber,
      createdAt: student.createdAt,
      dateOfBirth: student.dateOfBirth,
      phone: student.phone,
      fatherName: student.fatherName,
      fullName: `${student.firstName || ""} ${student.lastName || ""}`.trim(),
    })) || [];

  const [admitOpen, setAdmitOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{
    id: string;
    name: string;
    regNo: string;
  } | null>(null);

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 140,
    flex: 1,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const { id, fullName, registrationNumber } = params.row;

      return (
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Print */}
          <Tooltip title="Print">
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                handlePrintClick(id);
              }}
            >
              <PrintIcon />
            </IconButton>
          </Tooltip>

          {/* Admit */}
          <Tooltip title="Admit Student">
            <IconButton
              size="small"
              color="secondary"
              onClick={() => {
                setSelectedStudent({
                  id,
                  name: fullName,
                  regNo: registrationNumber,
                });
                setAdmitOpen(true);
              }}
            >
              <SchoolIcon />
            </IconButton>
          </Tooltip>

          {/* Edit */}
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="info"
              onClick={() => {
                dispatch(setStudentId(id));
                // open your edit screen here (navigate or show modal)
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          {/* Delete */}
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this student?"
                  )
                ) {
                  // Dispatch your delete logic here
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
  };

  const columns: GridColDef[] = [
    {
      field: "registrationNumber",
      headerName: "Reg No.",
      flex: 0.7,
      minWidth: 100,
    },
    { field: "fullName", headerName: "Name", flex: 0.7, minWidth: 150 },
    {
      field: "dateOfBirth",
      headerName: "DOB",
      flex: 0.5,
      minWidth: 120,
      type: "date",
      valueFormatter: (params) => formatDateWithoutTime(params),
    },
    {
      field: "createdAt",
      headerName: "Admission Date",
      flex: 0.7,
      minWidth: 120,
      type: "date",
      valueFormatter: (params) => convertUtcToLocal(params),
    },
    {
      field: "fatherName",
      headerName: "Father's Name",
      flex: 0.7,
      minWidth: 150,
    },
    { field: "phone", headerName: "Contact", flex: 0.7, minWidth: 120 },
  ];

  const columnsWithActions = [...columns, actionColumn];

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
          columns={columnsWithActions}
          pageSizeOptions={[10, 20, 50, 100]}
          serverSidePagination
          totalRows={students?.totalRecords || 0}
          loading={loading}
          getRowId={(row) => row.registrationNumber}
          // onRowClick={(params) => {
          //   dispatch(setStudentId(params.row.id));
          // }}
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

      {selectedStudent && (
        <AdmitStudentDialog
          open={admitOpen}
          onClose={() => setAdmitOpen(false)}
          studentId={selectedStudent.id}
          studentName={selectedStudent.name}
          registrationNumber={selectedStudent.regNo}
          onEnrollSuccess={() => {
            setAdmitOpen(false);
            dispatch(getStudents({ pageNumber, pageSize, searchString }));
          }}
        />
      )}
    </Paper>
  );
};

export default AdmissionGrid;
