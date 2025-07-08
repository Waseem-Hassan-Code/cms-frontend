// src/pages/admissions/types/admissionTypes.ts
export interface AdmissionFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | null;
  nationality: string;
  religion: string;
  bloodGroup: string;

  // Contact Info
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;

  // Guardian Info
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  motherName: string;
  guardianEmail: string;

  // Fee Info
  admissionFee: number;
  tuitionFee: number;
  paymentMethod: string;
  remarks: string;

  // Additional fields (not shown in form but needed for submission)
  admissionDate: Date;
  registrationNumber: string;
}

export interface AdmissionRecord extends AdmissionFormData {
  id: string;
  status: "Active" | "Inactive";
}
