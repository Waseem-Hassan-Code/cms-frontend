// src/pages/students/types/studentTypes.ts

export interface Filters {
  class: string;
  section: string;
  search: string;
}

export interface StudentBasicInfoData {
  id: string;
  studentName: string;
  rollNumber: number;
  className: string;
  sectionName: string;
  studentPhotoUrl?: string;
  classId: string;
  sectionId: string;
  fatherName: string;
  motherName: string;
  registrationNumber: string;
  contactNumber: string;
  address: string;
  admissionDate: string;
}
