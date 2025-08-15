import { Box, Paper, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useEffect } from "react";

import { getEnrolledStudents } from "../../../redux/enrolled-students/enrolled-student-thunk";
import {
  clearStudents,
  setPageNumber,
  setPageSize,
  setSelectedStudentId,
} from "../../../redux/enrolled-students/enrolled-student-slice";

import { CustomDataGrid } from "../../components/custom-data-grid";
import { getInitials, stringToColor } from "../../../utilities/avatar-helpers";

const StudentGrid = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    classId,
    sectionId,
    pageSize,
    pageNumber,
    students,
    searchString,
    loading,
  } = useSelector((state: RootState) => state.enrolledStudents);

  const rows =
    students?.data?.map((student) => ({
      id: student.id || "",
      regNumber: student.regNumber,
      fullName: student.fullName,
      fatherName: student.fatherName,
      class: student.class,
      section: student.section,
      rollNumber: student.rollNumber,
    })) || [];

  useEffect(() => {
    dispatch(
      getEnrolledStudents({
        pageNumber,
        pageSize,
        searchString,
        classId,
        sectionId,
      })
    );
    return () => {
      dispatch(clearStudents());
    };
  }, [dispatch, pageNumber, pageSize, searchString, classId, sectionId]);

  const avatarColumn = {
    field: "avatar",
    headerName: "",
    width: 60,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params: any) => {
      const { fullName } = params.row;
      const initials = getInitials(fullName);
      const color = stringToColor(fullName);
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Avatar
            sx={{
              bgcolor: color,
              color: "#fff",
              fontWeight: 500,
              width: 35,
              height: 35,
              fontSize: 16,
              boxShadow: 2,
            }}
          >
            {initials}
          </Avatar>
        </Box>
      );
    },
  };

  const columns = [
    avatarColumn,
    { field: "regNumber", headerName: "Reg No.", flex: 1 },
    { field: "fullName", headerName: "Name", flex: 2 },
    { field: "fatherName", headerName: "Father's Name", flex: 2 },
    { field: "rollNumber", headerName: "Roll Number", flex: 2 },
    { field: "class", headerName: "Class", flex: 2 },
    { field: "section", headerName: "Section", flex: 2 },
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
          loading={loading}
          pageSizeOptions={[10, 20, 50, 100]}
          serverSidePagination
          totalRows={students?.totalRecords || 0}
          onRowClick={(params) => dispatch(setSelectedStudentId(params.row.id))}
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

export default StudentGrid;
