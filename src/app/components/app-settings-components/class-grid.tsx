import { useEffect, useState } from "react";
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
  Fade,
  Tooltip,
  Chip,
  useTheme,
  Divider,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import type { AppDispatch, RootState } from "../../../redux/store";
import {
  addClass,
  getClasses,
  deleteClass,
} from "../../../redux/school-settings/class-config/class-thunk";

interface FormValues {
  className: string;
  classSymbol: number;
}

export default function ClassesGrid() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { schoolClasses } = useSelector(
    (state: RootState) => state.classSettings
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { className: "", classSymbol: 0 },
  });

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const onSubmit = (data: FormValues) => {
    dispatch(addClass(data))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        dispatch(getClasses());
        reset();
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to add class");
      });
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    dispatch(deleteClass(id))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Class deleted successfully");
        dispatch(getClasses());
      })
      .catch((err) => {
        toast.error(
          typeof err === "string" ? err : err?.message || "Something went wrong"
        );
      });
  };

  const classList = Array.isArray(schoolClasses) ? schoolClasses : [];

  return (
    <Box
      sx={{
        p: 0,
        borderRadius: 4,
        minHeight: 250,
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, #f8fafc 100%)`,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, px: 2, pt: 2 }}>
        <Chip
          icon={<SchoolIcon sx={{ color: theme.palette.primary.main }} />}
          label="Classes"
          sx={{
            fontWeight: 700,
            fontSize: 18,
            bgcolor: "#fff",
            color: theme.palette.primary.main,
            px: 1.5,
            boxShadow: 1,
            mr: 1,
          }}
        />
        <Box flexGrow={1} />
        <Tooltip title="Add Class" arrow TransitionComponent={Fade}>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              background: theme.palette.primary.main,
              color: "#fff",
              borderRadius: "50%",
              boxShadow: 2,
              "&:hover": { background: theme.palette.primary.dark },
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Class List - Scrollable */}
      <Box
        sx={{
          maxHeight: 350,
          overflowY: "auto",
          px: 2,
          pb: 2,
        }}
      >
        <List dense>
          {classList.length === 0 && (
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
              No classes added yet.
            </Typography>
          )}
          {classList.map((cls) => (
            <ListItem
              key={cls.id}
              secondaryAction={
                <Tooltip title="Delete" arrow>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDelete(cls.id)}
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
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {cls.className} ({cls.classSymbol})
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Add Class Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, minWidth: 400, p: 1 } }}
      >
        <DialogTitle
          sx={{ fontWeight: 700, color: theme.palette.primary.main }}
        >
          Add New Class
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          {/* Class Name */}
          <Controller
            name="className"
            control={control}
            rules={{
              required: "Class name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Numbers are not allowed",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Class Name"
                fullWidth
                error={!!errors.className}
                helperText={errors.className?.message}
                margin="dense"
                variant="outlined"
                sx={{ mb: 2, bgcolor: "#fafafa", borderRadius: 1 }}
              />
            )}
          />

          {/* Class Symbol */}
          <Controller
            name="classSymbol"
            control={control}
            rules={{
              required: "Class symbol is required",
              min: { value: 1, message: "Must be a positive number" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Class Symbol"
                type="number"
                fullWidth
                error={!!errors.classSymbol}
                helperText={errors.classSymbol?.message}
                margin="dense"
                variant="outlined"
                sx={{ bgcolor: "#fafafa", borderRadius: 1 }}
              />
            )}
          />
        </DialogContent>
        <Divider />
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
