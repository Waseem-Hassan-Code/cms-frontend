export interface StudentAdmissionForm {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date; // use string to represent DateTime (ISO string)
  nationality: string;
  religion: string;
  bloodGroup: string;

  // Contact Info
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string; // default in C# was "Pakistan"

  // Admission Details
  admissionDate: Date; // use string to represent DateTime
  previousSchool: string;
  previousClass: string;
  registrationNumber: string;
  isActive: boolean;

  // Guardian Info
  fatherName: string;
  fatherOccupation: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  whatsappNumber: string;
  motherName: string;
  guardianEmail: string;

  // Optional Docs
  profileImageUrl: string;
  cnicNumber: string;
  birthCertificateNo: string;
  isEnrolled?: boolean;

  // Metadata
  remarks: string;
  activeStep: number;
}

export interface StudentEnrollmentDto {
  id?: string | null;
  studentId: string;
  classId: string;
  sectionId: string;
  isActive: boolean;
}

export interface GetAdmittedStudentsDto {
  id: string;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  createdAt: string;
  fatherName: string;
  phone: string;
  activeStep: number;
}
