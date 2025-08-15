import type { StudentDetailsDto } from "../../../../models/enrolled-students";
import type { StudentBasicInfoData } from "./type";

// Mapping function
export const mapStudentDetailsToBasicInfo = (
  dto: StudentDetailsDto
): StudentBasicInfoData => {
  return {
    id: dto.id,
    studentName: dto.studentName,
    rollNumber: dto.rollNumber,
    className: dto.className,
    sectionName: dto.sectionName,
    classId: dto.classId,
    sectionId: dto.sectionId,
    fatherName: dto.fatherName,
    motherName: dto.motherName,
    registrationNumber: dto.registrationNumber,
    contactNumber: "", // or map from somewhere if you have it
    address: dto.address,
    admissionDate: dto.admissionDate,
  };
};
