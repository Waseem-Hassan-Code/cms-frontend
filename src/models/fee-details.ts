export interface FeeDetailsDto {
  id?: string;
  feeType: string;
  feeAmount: number;
  isDiscountable: boolean;
}

export interface FeeVoucherItem {
  feeTypeId: string; // Maps to Guid FeeTypeId
  feeAmount: number; // Maps to double FeeAmount
}

export interface StudentFeeVoucher {
  studentId: string; // Maps to Guid StudentId
  feeVoucherItems: FeeVoucherItem[]; // Maps to List<FeeVoucherItems> - REQUIRED
  remarks?: string; // Maps to string Remarks
  dueDate: string | null; // Maps to DateTime? DueDate (ISO string)
  voucherMonthYear: string | null; // Maps to DateOnly? VoucherMonthYear (YYYY-MM-DD)
  tutionFee: number; // Maps to double TutionFee (required with default 0.0)
}
