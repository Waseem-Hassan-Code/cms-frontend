import { Box, Container } from "@mui/material";
import StudentGrid from "./student-grid";
import StudentDetail from "./student-detail/student-detail";
import StudentFilters from "./student-filters";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import {
  setSelectedStudentId,
  setStudentTutionFee,
} from "../../../redux/enrolled-students/enrolled-student-slice";
import { useEffect } from "react";
import { getStudentDetailByStudentId } from "../../../redux/enrolled-students/enrolled-student-thunk";
import { toast } from "sonner";

const StudentPage = () => {
  const { selectedStudentId, studentDetails, loading } = useSelector(
    (state: RootState) => state.enrolledStudents
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedStudentId) {
      dispatch(getStudentDetailByStudentId({ id: selectedStudentId }))
        .unwrap()
        .then((result) => {
          // Use the correct property name from your API
          dispatch(setStudentTutionFee(result?.data?.tutionFee || 0));
        })
        .catch((error) => {
          toast.error(error || "Failed to fetch student details");
        });
    }
  }, [selectedStudentId, dispatch]);

  const handleBackClick = () => {
    dispatch(setSelectedStudentId(""));
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {!selectedStudentId ? (
        <>
          <StudentFilters />
          <Box sx={{ mt: 3 }}>
            <StudentGrid />
          </Box>
        </>
      ) : (
        <StudentDetail
          student={studentDetails?.data!}
          isLoading={loading}
          onBack={handleBackClick}
        />
      )}
    </Container>
  );
};

export default StudentPage;
