import { useEffect, useState } from "react";
import {
  Box,
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
  Collapse,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate, useParams } from "react-router-dom";
import AddFeePopup from "./add-fee-popup";
import EditFeePopup from "./edit-fee-popup";
import { useDispatch, useSelector } from "react-redux";
import { getStudentPendingFeeDetailByStudentId } from "../../../../../redux/enrolled-students/fee-details/pending-fee-thunk";
import {
  updateFeeVoucherItem,
  deleteFeeVoucherItem,
  addFeeVoucherItem,
} from "../../../../../redux/settings/settings-thunk";
import {
  clearUpdateError,
  clearDeleteError,
  clearAddError,
} from "../../../../../redux/settings/settings-slice";
import type { AppDispatch, RootState } from "../../../../../redux/store";
import type {
  FeeVouchersDto,
  FeeVoucherItemsDto,
} from "../../../../../models/pending-fee-detail";
import type { FeeDetailsDto } from "../../../../../models/fee-details";

const FeeDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();

  const { refreshFlag } = useSelector(
    (state: RootState) => state.enrolledStudents
  );

  const { pendingFees, loading, error } = useSelector(
    (state: RootState) => state.enrolledStudentPendingFeeAndOtherDetails
  );

  const { settings, updateError, deleteError, adding, addError } = useSelector(
    (state: RootState) => state.applicationSettings
  );

  useEffect(() => {
    dispatch(getStudentPendingFeeDetailByStudentId({ id }));
  }, [dispatch, id, refreshFlag]);

  // Monitor update errors from settings slice
  useEffect(() => {
    if (updateError) {
      setErrorMessage(updateError);
    }
  }, [updateError]);

  // Monitor delete errors from settings slice
  useEffect(() => {
    if (deleteError) {
      setErrorMessage(deleteError);
    }
  }, [deleteError]);

  // Monitor add errors from settings slice
  useEffect(() => {
    if (addError) {
      setErrorMessage(addError);
    }
  }, [addError]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      if (updateError) {
        dispatch(clearUpdateError());
      }
      if (deleteError) {
        dispatch(clearDeleteError());
      }
      if (addError) {
        dispatch(clearAddError());
      }
    };
  }, [dispatch, updateError, deleteError, addError]);

  // Get vouchers from API data
  const apiVouchers = pendingFees?.data || [];

  // Local state for vouchers to enable optimistic updates
  // This prevents unnecessary API refetches and improves performance
  const [localVouchers, setLocalVouchers] = useState<FeeVouchersDto[]>([]);

  // Update local vouchers when API data changes
  useEffect(() => {
    setLocalVouchers(apiVouchers);
  }, [apiVouchers]);

  // Use local vouchers for rendering
  const vouchers = localVouchers;

  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItemVoucherId, setNewItemVoucherId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<FeeVoucherItemsDto> | null>(
    null
  );

  // State for success/error messages
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // State to track temporary edit values
  const [tempEditValues, setTempEditValues] = useState<{
    [key: string]: Partial<FeeVoucherItemsDto>;
  }>({});

  const toggleExpand = (voucherId: string) => {
    setExpandedMonth(expandedMonth === voucherId ? null : voucherId);
  };

  const handleEdit = (id: string) => {
    // Find the current item
    const currentItem = vouchers
      .flatMap((v) => v.feeVoucherItems || [])
      .find((item) => item.id === id);

    if (currentItem) {
      // Don't allow editing admission fees
      if (isAdmissionFee(currentItem.feeTypeName)) {
        console.log("Cannot edit admission fee item");
        return;
      }

      // Initialize temp edit values with current item values
      setTempEditValues((prev) => ({
        ...prev,
        [id]: {
          ...currentItem,
          // Ensure all required fields are present
          feeTypeName: currentItem.feeTypeName || "",
          feeTypeId: currentItem.feeTypeId || "",
          feeAmount: currentItem.feeAmount || 0,
          discountAmount: currentItem.discountAmount || 0,
          paidAmount: currentItem.paidAmount || 0,
          dueAmount: currentItem.dueAmount || 0,
        },
      }));
    }
    setEditingId(id);
  };

  const handleSave = async (
    voucherId: string,
    itemId: string,
    updated: Partial<FeeVoucherItemsDto>
  ) => {
    console.log("Individual save clicked:", {
      voucherId,
      itemId,
      updated,
    });

    try {
      // Find the original item to get all required fields
      const originalItem = vouchers
        .flatMap((v) => v.feeVoucherItems || [])
        .find((item) => item.id === itemId);

      if (!originalItem) {
        throw new Error(`Original item with id ${itemId} not found`);
      }

      // Merge original item with updated data
      const feeVoucherItemToUpdate: FeeVoucherItemsDto = {
        ...originalItem,
        ...updated,
        // Ensure Guid format (strings in TypeScript)
        id: originalItem.id,
        feeVoucherId: originalItem.feeVoucherId,
        feeTypeId: updated.feeTypeId || originalItem.feeTypeId,
        feeTypeName: updated.feeTypeName || originalItem.feeTypeName,
        feeAmount: updated.feeAmount ?? originalItem.feeAmount,
        discountAmount: updated.discountAmount ?? originalItem.discountAmount,
        paidAmount: updated.paidAmount ?? originalItem.paidAmount,
        dueAmount: updated.dueAmount ?? originalItem.dueAmount,
        remarks: updated.remarks ?? originalItem.remarks,
      };

      console.log("Updating individual item:", feeVoucherItemToUpdate);

      // Call the API
      const result = await dispatch(
        updateFeeVoucherItem(feeVoucherItemToUpdate)
      ).unwrap();

      console.log("Update successful:", result);

      // Update local state optimistically
      setLocalVouchers((prevVouchers) =>
        prevVouchers.map((voucher) => ({
          ...voucher,
          feeVoucherItems: (voucher.feeVoucherItems || []).map((item) =>
            item.id === itemId ? feeVoucherItemToUpdate : item
          ),
        }))
      );

      // Clear temp edit values for this item
      setTempEditValues((prev) => {
        const newValues = { ...prev };
        delete newValues[itemId];
        return newValues;
      });

      setEditingId(null);

      // Show success message
      setSuccessMessage("Fee voucher item updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);

      // Revert any temporary edit values since the update failed
      setTempEditValues((prev) => {
        const newValues = { ...prev };
        delete newValues[itemId];
        return newValues;
      });

      setEditingId(null);

      setErrorMessage(
        typeof error === "string" ? error : "Failed to update fee voucher item"
      );
    }
  };

  const handleDelete = async (voucherId: string, itemId: string) => {
    console.log("Delete voucher item:", { voucherId, itemId });

    try {
      // Call the delete API
      await dispatch(deleteFeeVoucherItem(itemId)).unwrap();

      console.log("Delete successful");

      // Update local state optimistically - remove the item
      setLocalVouchers((prevVouchers) =>
        prevVouchers.map((voucher) => ({
          ...voucher,
          feeVoucherItems: (voucher.feeVoucherItems || []).filter(
            (item) => item.id !== itemId
          ),
        }))
      );

      // Show success message
      setSuccessMessage("Fee voucher item deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      // No need to revert local state for delete since we don't do optimistic delete
      // (we only update local state after successful API call)
      setErrorMessage(
        typeof error === "string" ? error : "Failed to delete fee voucher item"
      );
    }
  };

  const handleAddRow = (voucherId: string) => {
    setNewItemVoucherId(voucherId);
    setNewItem({
      id: "",
      feeVoucherId: voucherId,
      feeTypeId: "",
      feeTypeName: "",
      feeAmount: 0,
      discountAmount: 0,
      paidAmount: 0,
      dueAmount: 0,
      remarks: null,
    });
  };

  const handleSaveNew = async () => {
    if (newItem && newItemVoucherId) {
      console.log("Save new voucher item:", { newItem, newItemVoucherId });

      try {
        // Create the complete FeeVoucherItemsDto object
        const newFeeVoucherItem: FeeVoucherItemsDto = {
          id: "", // Will be generated by the backend
          feeVoucherId: newItemVoucherId,
          feeTypeId: newItem.feeTypeId || "",
          feeTypeName: newItem.feeTypeName || "",
          feeAmount: newItem.feeAmount || 0,
          discountAmount: newItem.discountAmount || 0,
          paidAmount: newItem.paidAmount || 0,
          dueAmount: newItem.dueAmount || 0,
          remarks: newItem.remarks || null,
        };

        console.log("Adding new fee voucher item:", newFeeVoucherItem);

        // Call the API
        const result = await dispatch(
          addFeeVoucherItem(newFeeVoucherItem)
        ).unwrap();

        console.log("Add successful:", result);

        // Update local state optimistically - add the new item to the correct voucher
        const addedItem = result.data; // The API should return the created item with the ID
        setLocalVouchers((prevVouchers) =>
          prevVouchers.map((voucher) =>
            voucher.id === newItemVoucherId
              ? {
                  ...voucher,
                  feeVoucherItems: [
                    ...(voucher.feeVoucherItems || []),
                    addedItem,
                  ],
                }
              : voucher
          )
        );

        // Clear new item state
        setNewItem(null);
        setNewItemVoucherId(null);

        // Show success message
        setSuccessMessage("Fee voucher item added successfully!");
      } catch (error) {
        console.error("Add failed:", error);
        setErrorMessage(
          typeof error === "string" ? error : "Failed to add fee voucher item"
        );
      }
    }
  };

  const calculateSummary = (
    items: FeeVoucherItemsDto[],
    includeEdits: boolean = false
  ) => {
    const itemsWithEdits = includeEdits
      ? items.map((item) => ({
          ...item,
          ...tempEditValues[item.id!],
        }))
      : items;

    const totalFee = itemsWithEdits.reduce(
      (sum, i) => sum + (i.feeAmount || 0),
      0
    );
    const discount = itemsWithEdits.reduce(
      (sum, i) => sum + (i.discountAmount || 0),
      0
    );
    const received = itemsWithEdits.reduce(
      (sum, i) => sum + (i.paidAmount || 0),
      0
    );
    // Calculate payable as totalFee - discount - received for real-time updates
    const payable = totalFee - discount - received;
    return { totalFee, discount, received, payable };
  };

  // Helper function to get fee types from settings
  const getFeeTypes = (): FeeDetailsDto[] => {
    return settings?.feeDetails || [];
  };

  // Helper function to check if fee type is admission fee (non-editable)
  const isAdmissionFee = (feeTypeName: string): boolean => {
    return feeTypeName?.toLowerCase().includes("admission") || false;
  };

  // Helper function to get current edit value for an item
  const getCurrentEditValue = (
    itemId: string,
    field: keyof FeeVoucherItemsDto,
    originalValue: any
  ) => {
    return tempEditValues[itemId]?.[field] ?? originalValue;
  };

  // Helper function to update temp edit values
  const updateTempEditValue = (
    itemId: string,
    field: keyof FeeVoucherItemsDto,
    value: any
  ) => {
    setTempEditValues((prev) => {
      const currentItem = prev[itemId] || {};
      const updatedItem = {
        ...currentItem,
        [field]: value,
      };

      // Auto-calculate due amount when fee amount, discount, or paid amount changes
      if (
        field === "feeAmount" ||
        field === "discountAmount" ||
        field === "paidAmount"
      ) {
        const feeAmount = updatedItem.feeAmount || 0;
        const discountAmount = updatedItem.discountAmount || 0;
        const paidAmount = updatedItem.paidAmount || 0;
        updatedItem.dueAmount = feeAmount - discountAmount - paidAmount;
      }

      return {
        ...prev,
        [itemId]: updatedItem,
      };
    });
  };

  // Function to cancel editing
  const handleCancelEdit = (itemId: string) => {
    setEditingId(null);
    // Clear temp edit values for this item
    setTempEditValues((prev) => {
      const newValues = { ...prev };
      delete newValues[itemId];
      return newValues;
    });
  };

  // Function to clear error messages and update/delete/add errors
  const clearErrors = () => {
    setErrorMessage("");
    if (updateError) {
      dispatch(clearUpdateError());
    }
    if (deleteError) {
      dispatch(clearDeleteError());
    }
    if (addError) {
      dispatch(clearAddError());
    }
  };

  const [openAddFee, setOpenAddFee] = useState(false);
  const [openEditFee, setOpenEditFee] = useState(false);

  const handleOpenAddFee = () => setOpenAddFee(true);
  const handleCloseAddFee = () => setOpenAddFee(false);

  const handleOpenEditFee = () => setOpenEditFee(true);
  const handleCloseEditFee = () => setOpenEditFee(false);

  const handlePrintVoucher = (voucher: FeeVouchersDto) => {
    const voucherDate = voucher.voucherMonthYear
      ? new Date(voucher.voucherMonthYear).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })
      : "N/A";
    const printContent = `
      <h2>Fee Voucher - ${voucherDate}</h2>
      <p><b>Student:</b> Ali Khan | <b>Class:</b> 10-B</p>
      <table border="1" cellspacing="0" cellpadding="8" width="100%">
        <tr>
          <th>Fee Type</th>
          <th>Total Fee</th>
          <th>Discount</th>
          <th>Received</th>
        </tr>
        ${(voucher.feeVoucherItems || [])
          .map(
            (i) => `
          <tr>
            <td>${i.feeTypeName}</td>
            <td>${i.feeAmount}</td>
            <td>${i.discountAmount}</td>
            <td>${i.paidAmount}</td>
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
    <Box sx={{ width: "100%" }}>
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

      {/* Loading State */}
      {loading && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography>Loading fee details...</Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="error">Error: {error}</Typography>
        </Box>
      )}

      {/* Empty State */}
      {!loading && !error && vouchers.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="text.secondary">No fee vouchers found.</Typography>
        </Box>
      )}

      {/* Fee Vouchers */}
      {!loading &&
        !error &&
        vouchers.map((voucher) => {
          const voucherItems = voucher.feeVoucherItems || [];
          const summary = calculateSummary(voucherItems, true); // Include temp edits for real-time updates
          const voucherDate = voucher.voucherMonthYear
            ? new Date(voucher.voucherMonthYear).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })
            : "N/A";

          return (
            <Paper key={voucher.id} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                onClick={() => toggleExpand(voucher.id)}
                sx={{ cursor: "pointer" }}
              >
                <Typography variant="h6">{voucherDate}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrintVoucher(voucher);
                    }}
                  >
                    <PrintIcon />
                  </IconButton>
                  {expandedMonth === voucher.id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </Box>
              </Box>

              <Collapse
                in={expandedMonth === voucher.id}
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
                    {voucherItems.map((item) =>
                      editingId === item.id ? (
                        <TableRow key={item.id}>
                          <TableCell>
                            {isAdmissionFee(item.feeTypeName) ? (
                              <TextField
                                value="Admission Fee"
                                disabled
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            ) : (
                              <Select
                                value={
                                  getCurrentEditValue(
                                    item.id!,
                                    "feeTypeName",
                                    item.feeTypeName
                                  ) ||
                                  item.feeTypeName ||
                                  ""
                                }
                                onChange={(e) => {
                                  const selectedFeeType = getFeeTypes().find(
                                    (ft) => ft.feeType === e.target.value
                                  );
                                  updateTempEditValue(
                                    item.id!,
                                    "feeTypeName",
                                    e.target.value
                                  );
                                  if (selectedFeeType) {
                                    updateTempEditValue(
                                      item.id!,
                                      "feeTypeId",
                                      selectedFeeType.id || ""
                                    );
                                    // Auto-update fee amount when fee type changes
                                    updateTempEditValue(
                                      item.id!,
                                      "feeAmount",
                                      selectedFeeType.feeAmount || 0
                                    );
                                  }
                                }}
                                fullWidth
                                size="small"
                              >
                                {getFeeTypes().map((feeType) => (
                                  <MenuItem
                                    key={feeType.id}
                                    value={feeType.feeType}
                                  >
                                    {feeType.feeType}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={getCurrentEditValue(
                                item.id!,
                                "feeAmount",
                                item.feeAmount
                              )}
                              onChange={(e) => {
                                updateTempEditValue(
                                  item.id!,
                                  "feeAmount",
                                  Number(e.target.value)
                                );
                              }}
                              disabled={isAdmissionFee(item.feeTypeName)}
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={getCurrentEditValue(
                                item.id!,
                                "discountAmount",
                                item.discountAmount
                              )}
                              onChange={(e) => {
                                updateTempEditValue(
                                  item.id!,
                                  "discountAmount",
                                  Number(e.target.value)
                                );
                              }}
                              disabled={isAdmissionFee(item.feeTypeName)}
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={getCurrentEditValue(
                                item.id!,
                                "paidAmount",
                                item.paidAmount
                              )}
                              onChange={(e) => {
                                updateTempEditValue(
                                  item.id!,
                                  "paidAmount",
                                  Number(e.target.value)
                                );
                              }}
                              disabled={isAdmissionFee(item.feeTypeName)}
                              size="small"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="success"
                              onClick={() => {
                                const updatedData = {
                                  ...item,
                                  ...tempEditValues[item.id!],
                                };
                                handleSave(voucher.id, item.id!, updatedData);
                              }}
                            >
                              <SaveIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleCancelEdit(item.id!)}
                            >
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                color: isAdmissionFee(item.feeTypeName)
                                  ? "#666"
                                  : "inherit",
                              }}
                            >
                              {item.feeTypeName || "Admission Fee"}
                              {isAdmissionFee(item.feeTypeName) && (
                                <Box
                                  component="span"
                                  sx={{
                                    ml: 1,
                                    fontSize: "0.75rem",
                                    color: "#999",
                                    fontStyle: "italic",
                                  }}
                                >
                                  (Non-editable)
                                </Box>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>{item.feeAmount}</TableCell>
                          <TableCell>{item.discountAmount}</TableCell>
                          <TableCell>{item.paidAmount}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => handleEdit(item.id!)}
                              disabled={isAdmissionFee(item.feeTypeName)}
                              title={
                                isAdmissionFee(item.feeTypeName)
                                  ? "Admission fees cannot be edited"
                                  : "Edit this fee item"
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(voucher.id, item.id!)}
                              disabled={isAdmissionFee(item.feeTypeName)}
                              title={
                                isAdmissionFee(item.feeTypeName)
                                  ? "Admission fees cannot be deleted"
                                  : "Delete this fee item"
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    )}

                    {/* New Row */}
                    {newItem && newItemVoucherId === voucher.id && (
                      <TableRow>
                        <TableCell>
                          <Select
                            value={newItem.feeTypeName || ""}
                            onChange={(e) => {
                              const selectedFeeType = getFeeTypes().find(
                                (ft) => ft.feeType === e.target.value
                              );
                              const feeAmount = selectedFeeType?.feeAmount || 0;
                              const discountAmount =
                                newItem.discountAmount || 0;
                              const paidAmount = newItem.paidAmount || 0;
                              setNewItem({
                                ...newItem,
                                feeTypeName: e.target.value,
                                feeTypeId: selectedFeeType?.id || "",
                                feeAmount: feeAmount, // Auto-fill fee amount
                                dueAmount:
                                  feeAmount - discountAmount - paidAmount,
                              });
                            }}
                            fullWidth
                            size="small"
                          >
                            {getFeeTypes().map((feeType) => (
                              <MenuItem
                                key={feeType.id}
                                value={feeType.feeType}
                              >
                                {feeType.feeType}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={newItem.feeAmount || 0}
                            onChange={(e) => {
                              const feeAmount = +e.target.value;
                              const discountAmount =
                                newItem.discountAmount || 0;
                              const paidAmount = newItem.paidAmount || 0;
                              setNewItem({
                                ...newItem,
                                feeAmount,
                                dueAmount:
                                  feeAmount - discountAmount - paidAmount,
                              });
                            }}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={newItem.discountAmount || 0}
                            onChange={(e) => {
                              const discountAmount = +e.target.value;
                              const feeAmount = newItem.feeAmount || 0;
                              const paidAmount = newItem.paidAmount || 0;
                              setNewItem({
                                ...newItem,
                                discountAmount,
                                dueAmount:
                                  feeAmount - discountAmount - paidAmount,
                              });
                            }}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={newItem.paidAmount || 0}
                            onChange={(e) => {
                              const paidAmount = +e.target.value;
                              const feeAmount = newItem.feeAmount || 0;
                              const discountAmount =
                                newItem.discountAmount || 0;
                              setNewItem({
                                ...newItem,
                                paidAmount,
                                dueAmount:
                                  feeAmount - discountAmount - paidAmount,
                              });
                            }}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="success"
                            onClick={handleSaveNew}
                            disabled={adding}
                            title={adding ? "Saving..." : "Save new item"}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setNewItem(null);
                              setNewItemVoucherId(null);
                            }}
                            disabled={adding}
                            title="Cancel"
                          >
                            <CancelIcon />
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
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddRow(voucher.id)}
                    disabled={adding}
                    sx={{
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      border: 0,
                      borderRadius: 3,
                      boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                      color: "white",
                      height: 48,
                      padding: "0 30px",
                      fontWeight: 600,
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
                        boxShadow: "0 6px 10px 2px rgba(33, 203, 243, .4)",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                      },
                      "&:disabled": {
                        background:
                          "linear-gradient(45deg, #BDBDBD 30%, #9E9E9E 90%)",
                        color: "rgba(255, 255, 255, 0.6)",
                        boxShadow: "none",
                        transform: "none",
                      },
                    }}
                  >
                    {adding ? "Adding..." : "✨ Add New Item"}
                  </Button>
                </Box>
              </Collapse>
            </Paper>
          );
        })}
      <AddFeePopup open={openAddFee} onClose={handleCloseAddFee} />
      <EditFeePopup open={openEditFee} onClose={handleCloseEditFee} />

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={clearErrors}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={clearErrors} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeeDetailsPage;
