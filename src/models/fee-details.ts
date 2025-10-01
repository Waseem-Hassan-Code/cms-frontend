export interface FeeDetailsDto {
  id?: string;
  feeType: string;
  feeAmount: number;
  isDiscountable: boolean;
}

export interface FeeVoucherItem {
  feeTypeId: string;
  feeAmount: number;
}

export interface StudentFeeVoucher {
  studentId: string;
  feeVoucherItems: FeeVoucherItem[];
  dueDate: Date | null;
  voucherMonthYear: string | null;
  tutionFee?: number;
  remarks?: string;
}
