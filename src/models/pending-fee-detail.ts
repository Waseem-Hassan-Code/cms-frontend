export interface FeeVouchersDto {
  id: string; // Guid
  studentId: string; // Guid
  totalAmount?: number; // nullable double
  paidAmount?: number; // nullable double
  discountAmount: number;
  dueAmount?: number; // nullable double
  dueDate?: string | null; // DateTime? (ISO string in JSON)
  lastPaymentDate?: string | null; // DateTime?
  voucherMonthYear?: string | null; // DateOnly? (ISO string like "2025-09-02")
  remarks?: string | null;
  isAdmissionVoucher: boolean;
  feeVoucherItems?: FeeVoucherItemsDto[]; // nullable list
}

export interface FeeVoucherItemsDto {
  id: string | null; // Guid
  feeVoucherId: string; // Guid
  feeTypeId: string; // Guid
  feeTypeName: string;
  feeAmount: number;
  discountAmount: number;
  paidAmount: number;
  dueAmount: number;
  remarks?: string | null;
}
