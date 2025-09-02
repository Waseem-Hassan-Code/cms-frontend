import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Collapse,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router-dom";
import AddFeePopup from "./add-fee-popup";
import EditFeePopup from "./edit-fee-popup";

interface VoucherItem {
  id: number;
  feeType: string;
  totalFee: number;
  discount: number;
  received: number;
}

interface Voucher {
  month: string;
  items: VoucherItem[];
}

const FeeDetailsPage = () => {
  const navigate = useNavigate();

  const [vouchers, setVouchers] = useState<Voucher[]>([
    {
      month: "January 2025",
      items: [
        {
          id: 1,
          feeType: "Admission Fee",
          totalFee: 5000,
          discount: 0,
          received: 5000,
        },
        {
          id: 2,
          feeType: "Tuition Fee",
          totalFee: 2000,
          discount: 200,
          received: 1800,
        },
      ],
    },
    {
      month: "February 2025",
      items: [
        {
          id: 3,
          feeType: "Tuition Fee",
          totalFee: 2000,
          discount: 0,
          received: 2000,
        },
      ],
    },
  ]);

  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newItemMonth, setNewItemMonth] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<VoucherItem | null>(null);

  const toggleExpand = (month: string) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  const handleEdit = (id: number) => setEditingId(id);

  const handleSave = (month: string, id: number, updated: VoucherItem) => {
    setVouchers(
      vouchers.map((voucher) =>
        voucher.month === month
          ? {
              ...voucher,
              items: voucher.items.map((i) => (i.id === id ? updated : i)),
            }
          : voucher
      )
    );
    setEditingId(null);
  };

  const handleDelete = (month: string, id: number) => {
    setVouchers(
      vouchers.map((voucher) =>
        voucher.month === month
          ? { ...voucher, items: voucher.items.filter((i) => i.id !== id) }
          : voucher
      )
    );
  };

  const handleAddRow = (month: string) => {
    setNewItemMonth(month);
    setNewItem({
      id: Date.now(),
      feeType: "",
      totalFee: 0,
      discount: 0,
      received: 0,
    });
  };

  const handleSaveNew = () => {
    if (newItem && newItemMonth) {
      setVouchers(
        vouchers.map((voucher) =>
          voucher.month === newItemMonth
            ? { ...voucher, items: [...voucher.items, newItem] }
            : voucher
        )
      );
      setNewItem(null);
      setNewItemMonth(null);
    }
  };

  const calculateSummary = (items: VoucherItem[]) => {
    const totalFee = items.reduce((sum, i) => sum + i.totalFee, 0);
    const discount = items.reduce((sum, i) => sum + i.discount, 0);
    const received = items.reduce((sum, i) => sum + i.received, 0);
    const payable = totalFee - discount - received;
    return { totalFee, discount, received, payable };
  };

  const [openAddFee, setOpenAddFee] = useState(false);
  const [openEditFee, setOpenEditFee] = useState(false);

  const handleOpenAddFee = () => setOpenAddFee(true);
  const handleCloseAddFee = () => setOpenAddFee(false);

  const handleOpenEditFee = () => setOpenEditFee(true);
  const handleCloseEditFee = () => setOpenEditFee(false);

  const handlePrintVoucher = (voucher: Voucher) => {
    const printContent = `
      <h2>Fee Voucher - ${voucher.month}</h2>
      <p><b>Student:</b> Ali Khan | <b>Class:</b> 10-B</p>
      <table border="1" cellspacing="0" cellpadding="8" width="100%">
        <tr>
          <th>Fee Type</th>
          <th>Total Fee</th>
          <th>Discount</th>
          <th>Received</th>
        </tr>
        ${voucher.items
          .map(
            (i) => `
          <tr>
            <td>${i.feeType}</td>
            <td>${i.totalFee}</td>
            <td>${i.discount}</td>
            <td>${i.received}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    `;
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(printContent);
      newWindow.document.close();
      newWindow.print();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {/* Back Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {/* Back Button (Left) */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>

        {/* Right Side Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleOpenAddFee}
            variant="contained"
            sx={{
              backgroundColor: "#009983",
              "&:hover": {
                backgroundColor: "#007b61",
              },
              textTransform: "none",
            }}
          >
            Add Fee
          </Button>

          <Button
            startIcon={<EditIcon />}
            onClick={handleOpenEditFee}
            variant="contained"
            sx={{
              backgroundColor: "#ffb400",
              "&:hover": {
                backgroundColor: "#e69500",
              },
              textTransform: "none",
            }}
          >
            Edit Student Monthly Fee
          </Button>
        </Box>
      </Box>

      {/* Student Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Fee Vouchers
        </Typography>
        <Typography color="text.secondary">
          Student: <b>Ali Khan</b> | Class: <b>10-B</b>
        </Typography>
      </Box>

      {vouchers.map((voucher) => {
        const summary = calculateSummary(voucher.items);

        return (
          <Paper key={voucher.month} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => toggleExpand(voucher.month)}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="h6">{voucher.month}</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrintVoucher(voucher);
                  }}
                >
                  <PrintIcon />
                </IconButton>
                {expandedMonth === voucher.month ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </Box>
            </Box>

            <Collapse
              in={expandedMonth === voucher.month}
              timeout="auto"
              unmountOnExit
            >
              {/* same table and add-item logic as before */}
              <Table sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Fee Type</TableCell>
                    <TableCell>Total Fee</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Received</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {voucher.items.map((item) =>
                    editingId === item.id ? (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Select
                            value={item.feeType}
                            onChange={(e) =>
                              setVouchers(
                                vouchers.map((v) =>
                                  v.month === voucher.month
                                    ? {
                                        ...v,
                                        items: v.items.map((i) =>
                                          i.id === item.id
                                            ? { ...i, feeType: e.target.value }
                                            : i
                                        ),
                                      }
                                    : v
                                )
                              )
                            }
                            fullWidth
                          >
                            <MenuItem value="Admission Fee">
                              Admission Fee
                            </MenuItem>
                            <MenuItem value="Tuition Fee">Tuition Fee</MenuItem>
                            <MenuItem value="Transport Fee">
                              Transport Fee
                            </MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={item.totalFee}
                            onChange={(e) =>
                              setVouchers(
                                vouchers.map((v) =>
                                  v.month === voucher.month
                                    ? {
                                        ...v,
                                        items: v.items.map((i) =>
                                          i.id === item.id
                                            ? {
                                                ...i,
                                                totalFee: +e.target.value,
                                              }
                                            : i
                                        ),
                                      }
                                    : v
                                )
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={item.discount}
                            onChange={(e) =>
                              setVouchers(
                                vouchers.map((v) =>
                                  v.month === voucher.month
                                    ? {
                                        ...v,
                                        items: v.items.map((i) =>
                                          i.id === item.id
                                            ? {
                                                ...i,
                                                discount: +e.target.value,
                                              }
                                            : i
                                        ),
                                      }
                                    : v
                                )
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={item.received}
                            onChange={(e) =>
                              setVouchers(
                                vouchers.map((v) =>
                                  v.month === voucher.month
                                    ? {
                                        ...v,
                                        items: v.items.map((i) =>
                                          i.id === item.id
                                            ? {
                                                ...i,
                                                received: +e.target.value,
                                              }
                                            : i
                                        ),
                                      }
                                    : v
                                )
                              )
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="success"
                            onClick={() =>
                              handleSave(voucher.month, item.id, item)
                            }
                          >
                            <SaveIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={item.id}>
                        <TableCell>{item.feeType}</TableCell>
                        <TableCell>{item.totalFee}</TableCell>
                        <TableCell>{item.discount}</TableCell>
                        <TableCell>{item.received}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleEdit(item.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(voucher.month, item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  )}

                  {/* New Row */}
                  {newItem && newItemMonth === voucher.month && (
                    <TableRow>
                      <TableCell>
                        <Select
                          value={newItem.feeType}
                          onChange={(e) =>
                            setNewItem({ ...newItem, feeType: e.target.value })
                          }
                          fullWidth
                        >
                          <MenuItem value="Admission Fee">
                            Admission Fee
                          </MenuItem>
                          <MenuItem value="Tuition Fee">Tuition Fee</MenuItem>
                          <MenuItem value="Transport Fee">
                            Transport Fee
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={newItem.totalFee}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              totalFee: +e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={newItem.discount}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              discount: +e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={newItem.received}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              received: +e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="success" onClick={handleSaveNew}>
                          <SaveIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )}

                  {/* Summary row */}
                  <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                    <TableCell>
                      <b>Summary</b>
                    </TableCell>
                    <TableCell>
                      <b>{summary.totalFee}</b>
                    </TableCell>
                    <TableCell>
                      <b>{summary.discount}</b>
                    </TableCell>
                    <TableCell>
                      <b>{summary.received}</b>
                    </TableCell>
                    <TableCell>
                      <b>Payable: {summary.payable}</b>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddRow(voucher.month)}
                >
                  Add Item
                </Button>
              </Box>
            </Collapse>
          </Paper>
        );
      })}
      <AddFeePopup open={openAddFee} onClose={handleCloseAddFee} />
      <EditFeePopup open={openEditFee} onClose={handleCloseEditFee} />
    </Container>
  );
};

export default FeeDetailsPage;
