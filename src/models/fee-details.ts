export interface FeeDetailsDto {
  id: string;
  feeType: string;
  feeAmount: number;
}

export interface FeeVoucherItem {
  feeTypeId: string;
  feeAmount: number;
}

export interface StudentFeeVoucher {
  studentId: string;
  feeVoucherItems: FeeVoucherItem[];
  tutionFee?: number;
  remarks?: string;
}
