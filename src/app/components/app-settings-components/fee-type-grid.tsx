import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Fade,
  Tooltip,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import theme from "../../../theme";
import {
  deleteFeeType,
  addFeeType,
} from "../../../redux/school-settings/fee-config/fee-thunk";
import type { FeeDetailsDto } from "../../../models/fee-details";
import { toast } from "sonner";
import { getFeeTypes } from "../../../redux/fee-details/fee-detail-thunk";

export default function FeeTypesGrid() {
  const dispatch = useDispatch<AppDispatch>();

  // feeDetails is array or empty array fallback
  const feeDetails = useSelector(
    (state: RootState) => state.feeDetails?.feeDetails ?? []
  );

  const [open, setOpen] = useState(false);
  const [feeType, setFeeType] = useState("");
  const [feeAmount, setFeeAmount] = useState("");
  const [isDiscountable, setIsDiscountable] = useState(true);

  const [localFeeDetails, setLocalFeeDetails] = useState<FeeDetailsDto[]>([]);

  useEffect(() => {
    dispatch(getFeeTypes());
  }, [dispatch]);

  useEffect(() => {
    setLocalFeeDetails(feeDetails);
  }, [feeDetails]);

  const handleAdd = () => {
    if (
      feeType.trim() &&
      feeAmount &&
      !localFeeDetails.some(
        (f) => f.feeType.toLowerCase() === feeType.trim().toLowerCase()
      )
    ) {
      const newFee: FeeDetailsDto = {
        feeType: feeType.trim(),
        feeAmount: Number(feeAmount),
        isDiscountable,
      };

      dispatch(addFeeType(newFee))
        .unwrap()
        .then((response) => {
          toast.success(response.message || "Fee type added successfully");
          dispatch(getFeeTypes());
        })
        .catch((error) => {
          toast.error(error.message || "Failed to add fee type");
        });

      setFeeType("");
      setFeeAmount("");
      setIsDiscountable(true);
      setOpen(false);
    }
  };

  // id is number | undefined
  const handleDelete = (id?: string) => {
    if (id === undefined) return;

    dispatch(deleteFeeType(id))
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Fee type deleted");
        dispatch(getFeeTypes());
      })
      .catch((error) => {
        toast.error(error.message || "Failed to delete fee type");
      });
  };

  return (
    <Box
      sx={{
        p: 0,
        borderRadius: 4,
        minHeight: 250,
        position: "relative",
        background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, #f8fafc 100%)`,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
        overflow: "hidden",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, px: 2, pt: 2 }}>
        <Chip
          icon={
            <MonetizationOnIcon sx={{ color: theme.palette.success.main }} />
          }
          label="Fee Types"
          sx={{
            fontWeight: 700,
            fontSize: 18,
            bgcolor: "#fff",
            color: theme.palette.success.main,
            px: 1.5,
            boxShadow: 1,
            mr: 1,
          }}
        />
        <Box flexGrow={1} />
        <Tooltip title="Add Fee Type" arrow TransitionComponent={Fade}>
          <IconButton
            color="success"
            onClick={() => setOpen(true)}
            sx={{
              background: theme.palette.success.main,
              color: "#fff",
              borderRadius: "50%",
              boxShadow: 2,
              "&:hover": {
                background: theme.palette.success.dark,
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Scrollable List with fixed height */}
      <List
        dense
        sx={{
          px: 2,
          pb: 2,
          maxHeight: 350,
          overflowY: "auto",
        }}
      >
        {localFeeDetails.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: "center",
              mt: 4,
              opacity: 0.7,
              fontStyle: "italic",
            }}
          >
            No fee types added yet.
          </Typography>
        ) : (
          localFeeDetails.map((fee) => (
            <ListItem
              key={fee.id || fee.feeType}
              secondaryAction={
                <Tooltip title="Delete" arrow>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDelete(fee.id)}
                    sx={{
                      bgcolor: "#fff",
                      "&:hover": { bgcolor: theme.palette.error.light },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              }
              sx={{
                borderRadius: 3,
                mb: 1.5,
                background: "#fff",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                px: 2,
                py: 1.2,
                alignItems: "center",
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10)",
                  background: "#f5faff",
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.success.dark,
                      letterSpacing: 0.5,
                    }}
                  >
                    {fee.feeType} — Rs. {fee.feeAmount}{" "}
                    {fee.isDiscountable ? "(Discountable)" : ""}
                  </Typography>
                }
              />
            </ListItem>
          ))
        )}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Fee Type</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Fee Type"
            fullWidth
            value={feeType}
            onChange={(e) => setFeeType(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Amount"
            fullWidth
            value={feeAmount}
            onChange={(e) =>
              setFeeAmount(e.target.value.replace(/[^0-9]/g, ""))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rs</InputAdornment>
              ),
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel id="discountable-label">Is Discountable</InputLabel>
            <Select
              labelId="discountable-label"
              value={isDiscountable.toString()}
              label="Is Discountable"
              onChange={(e) => setIsDiscountable(e.target.value === "true")}
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
