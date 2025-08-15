import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from "date-fns";
import type { VoucherToPdfDto } from "../models/student-admission-voucher";
import type { TDocumentDefinitions, PageSize } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

export function generateFeeVoucherPdf(voucher: VoucherToPdfDto) {
  const copyTypes = [
    { label: "Bank Copy", color: "#1976d2" },
    { label: "Office Copy", color: "#388e3c" },
    { label: "Personal Copy", color: "#fbc02d" },
  ];

  const buildFeeTable = () => [
    [
      { text: "Fee Type", bold: true, fillColor: "#e3f2fd" },
      { text: "Amount", bold: true, alignment: "right", fillColor: "#e3f2fd" },
    ],
    ...voucher.feeVoucherItems.map((item) => [
      item.feeTypeName,
      { text: item.feeAmount.toFixed(2), alignment: "right" },
    ]),
    [
      { text: "Tuition Fee", bold: true },
      { text: voucher.tutionFee.toFixed(2), alignment: "right", bold: true },
    ],
    [
      { text: "Total", bold: true, fillColor: "#e3f2fd" },
      {
        text: (
          voucher.feeVoucherItems.reduce((sum, i) => sum + i.feeAmount, 0) +
          voucher.tutionFee
        ).toFixed(2),
        alignment: "right",
        bold: true,
        fillColor: "#e3f2fd",
      },
    ],
  ];

  const defaultRemarks =
    "Please pay the fee before due date. No fee will be accepted after due date without fine.";

  const copies = copyTypes.map((type) => [
    {
      columns: [
        {
          width: "*",
          text: "Al-Huda Public School, Meithakheil",
          style: "header",
          color: type.color,
        },
        {
          width: "auto",
          text: type.label,
          style: "copyType",
          color: type.color,
        },
      ],
      margin: [0, 0, 0, 2],
    },
    {
      canvas: [
        {
          type: "rect",
          x: 0,
          y: 0,
          w: 260,
          h: 1.5,
          color: type.color,
        },
      ],
      margin: [0, 0, 0, 5],
    },
    {
      columns: [
        [
          { text: `Name: ${voucher.studentName}`, style: "info" },
          { text: `Father: ${voucher.fatherName}`, style: "info" },
          { text: `Class: ${voucher.className}`, style: "info" },
          { text: `Section: ${voucher.sectionName}`, style: "info" },
        ],
        [
          { text: `Reg #: ${voucher.registrationNumber}`, style: "info" },
          {
            text: `Month: ${voucher.voucherMonthYear ?? ""}`,
            style: "info",
          },
          {
            text: `Due Date: ${
              voucher.dueDate
                ? format(new Date(voucher.dueDate), "dd-MM-yyyy")
                : ""
            }`,
            style: "info",
          },
        ],
      ],
      columnGap: 10,
      margin: [0, 0, 0, 5],
    },
    {
      text: "Fee Details",
      style: "tableHeader",
      margin: [0, 5, 0, 2],
      color: type.color,
    },
    {
      table: {
        widths: ["*", "auto"],
        body: buildFeeTable(),
      },
      layout: {
        fillColor: (rowIndex: number) => (rowIndex === 0 ? "#e3f2fd" : null),
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
        hLineColor: () => "#bdbdbd",
        vLineColor: () => "#bdbdbd",
      },
      margin: [0, 0, 0, 2],
    },
    {
      text: `Remarks: ${voucher.remarks || defaultRemarks}`,
      margin: [0, 2, 0, 2],
      italics: true,
      color: "#616161",
      fontSize: 8,
    },
    {
      columns: [
        {
          text: "Signature: ____________________",
          margin: [0, 10, 0, 0],
          fontSize: 8,
        },
        {
          text: `Generated: ${format(new Date(), "dd-MM-yyyy HH:mm")}`,
          alignment: "right",
          margin: [0, 10, 0, 0],
          fontSize: 7,
          color: "#757575",
        },
      ],
    },
    // Spacer to fill empty space
    { text: "\n\n\n\n", fontSize: 6 },
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4" as PageSize,
    pageOrientation: "landscape",
    pageMargins: [20, 20, 20, 20] as [number, number, number, number],
    content: [
      {
        columns: [
          { width: "33%", stack: copies[0] as any[] },
          { width: "33%", stack: copies[1] as any[] },
          { width: "33%", stack: copies[2] as any[] },
        ],
        columnGap: 8,
      },
    ],
    styles: {
      header: {
        fontSize: 13,
        bold: true,
        alignment: "left",
      },
      copyType: {
        fontSize: 10,
        bold: true,
        alignment: "right",
      },
      tableHeader: { fontSize: 9, bold: true },
      info: { fontSize: 8, margin: [0, 0, 0, 1] },
    },
    defaultStyle: {
      fontSize: 8,
    },
  };

  pdfMake.createPdf(docDefinition).open();
}
