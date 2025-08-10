export interface AdmissionFormData {
  id?: string; // unique identifier for the student
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string; // use string to represent DateTime (ISO string)
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
  admissionDate: string; // use string to represent DateTime
  previousSchool: string;
  previousClass: string;
  registrationNumber: string;
  isActive: boolean;

  // Guardian Info
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  motherName: string;
  guardianEmail: string;

  // Optional Docs
  profileImageUrl: string;
  cnicNumber: string;
  birthCertificateNo: string;

  // Metadata
  remarks: string;
  activeStep: number;
}

export type FeeInfoData = {
  selectedFeeTypes: [{ feeTypeId: string; feeAmount: number }];
  tuitionFee: number;
  remarks?: string;
};

export interface AdmissionRecord extends AdmissionFormData {
  id: string;
  status: "Active" | "Inactive";
}
