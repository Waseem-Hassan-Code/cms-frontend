export interface EnrolledStudentDetailDto {
  id?: string;
  class: string;
  classId: string;
  sectionId: string;
  section: string;
  fullName: string;
  regNumber: string;
  fatherName: string;
  studentId: string;
  rollNumber: number;
}

export interface StudentDetailsDto {
  id: string;
  studentName: string;
  rollNumber: number;
  className: string;
  sectionName: string;
  classId: string;
  sectionId: string;
  fatherName: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  whatsappNumber: string;
  tutionFee: number;
  motherName: string;
  registrationNumber: string;
  address: string;
  studentPhotoUrl: string;
  admissionDate: string;
  studentFeeInfo: StudentFeeInfoDto;
}

export interface StudentFeeInfoDto {
  voucherId: string;
  totalFee: number;
  discountedAmount: number;
  paidFee: number;
  dueFee: number;
  lastPaymentDate: string;
  paymentStatus: string;
  voucherItems: VoucherItemsDto[];
}

export interface VoucherItemsDto {
  id: string;
  itemName: string;
  amount: number;
  paidAmount: number;
  discountedAmount: number;
  dueAmount: number;
  description: string;
}
