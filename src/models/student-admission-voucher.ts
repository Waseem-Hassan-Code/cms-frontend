export interface FeeVoucherItemsForPdf {
  feeTypeId: string; // Guid in C# -> string in TS
  feeTypeName: string;
  feeAmount: number;
}

export interface VoucherToPdfDto {
  studentId: string; // Guid in C# -> string in TS
  studentName: string;
  fatherName: string;
  className: string;
  sectionName: string;
  registrationNumber: string;
  feeVoucherItems: FeeVoucherItemsForPdf[];
  remarks: string;
  dueDate: string | null; // DateTime? in C# -> string | null in TS (ISO date string)
  voucherMonthYear: string | null; // DateOnly? in C# -> string | null in TS (YYYY-MM-DD)
  tutionFee: number;
}
