import React, { useEffect, useState } from "react";
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
  Fade,
  Tooltip,
  Chip,
  useTheme,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import {
  addSection,
  deleteSection,
  getSections,
} from "../../../redux/school-settings/section-config/section-thunk";
import type { SectionsDto } from "../../../models/school-settings";
import { toast } from "sonner";

export default function SectionsGrid() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const { schoolClasses } = useSelector(
    (state: RootState) => state.classSettings
  );
  const { sections } = useSelector((state: RootState) => state.sectionSettings);

  const [open, setOpen] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [headerClassId, setHeaderClassId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  useEffect(() => {
    if (headerClassId) {
      dispatch(getSections(headerClassId));
    }
  }, [dispatch, headerClassId]);

  useEffect(() => {
    if (schoolClasses.length > 0) {
      setHeaderClassId(schoolClasses[0].id!);
      setSelectedClassId(schoolClasses[0].id!);
    }
  }, [schoolClasses]);

  const handleAddSection = () => {
    if (!sectionName.trim()) return;
    dispatch(addSection({ sectionName, classId: selectedClassId }))
      .unwrap()
      .then((response) => {
        toast.success(response?.message || "Section added successfully");
        dispatch(getSections(selectedClassId));
        setOpen(false);
        setSectionName("");
      })
      .catch((err) => {
        toast.error(
          typeof err === "string" ? err : err?.message || "Something went wrong"
        );
      });
  };

  const handleDeleteSection = (id: string) => {
    dispatch(deleteSection(id))
      .unwrap()
      .then((message) => {
        toast.success(
          typeof message === "string" ? message : "Section deleted successfully"
        );
        dispatch(getSections(headerClassId));
      })
      .catch((err) => {
        toast.error(
          typeof err === "string" ? err : err?.message || "Something went wrong"
        );
      });
  };

  const sectionList = Array.isArray(sections) ? sections : [];

  return (
    <Box
      sx={{
        p: 0,
        borderRadius: 4,
        minHeight: 250,
        position: "relative",
        background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, #f8fafc 100%)`,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          px: 2,
          pt: 2,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Chip
          icon={<ViewListIcon sx={{ color: theme.palette.secondary.main }} />}
          label="Sections"
          sx={{
            fontWeight: 700,
            fontSize: 18,
            bgcolor: "#fff",
            color: theme.palette.secondary.main,
            px: 1.5,
            boxShadow: 1,
            mr: 1,
            flexShrink: 0,
          }}
        />

        <FormControl
          size="small"
          sx={{
            minWidth: 20,
            maxWidth: 90,
            flexGrow: 1,
            flexBasis: "150px",
            bgcolor: "#fff",
            borderRadius: 1,
            flexShrink: 1,
          }}
        >
          <InputLabel>Class</InputLabel>
          <Select
            value={headerClassId}
            label="Class"
            onChange={(e) => setHeaderClassId(e.target.value)}
            sx={{
              fontWeight: 600,
              color: theme.palette.secondary.dark,
            }}
          >
            {schoolClasses.map((cls) => (
              <MenuItem key={cls.id} value={cls.id!}>
                {cls.className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box flexGrow={1} />

        <Tooltip title="Add Section" arrow TransitionComponent={Fade}>
          <IconButton
            color="secondary"
            onClick={() => {
              setSelectedClassId(headerClassId);
              setOpen(true);
            }}
            sx={{
              background: theme.palette.secondary.main,
              color: "#fff",
              borderRadius: "50%",
              boxShadow: 2,
              flexShrink: 0,
              width: 40,
              height: 40,
              "&:hover": {
                background: theme.palette.secondary.dark,
              },
            }}
            aria-label="add section"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          maxHeight: 350,
          overflowY: "auto",
          px: 2,
          pb: 2,
        }}
      >
        <List dense>
          {sectionList.length === 0 && (
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
              No sections added for this class yet.
            </Typography>
          )}
          {sectionList.map((section: SectionsDto) => (
            <ListItem
              key={section.id}
              secondaryAction={
                <Tooltip title="Delete" arrow>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDeleteSection(section.id!)}
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
                      color: theme.palette.secondary.dark,
                    }}
                  >
                    {section.sectionName}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Add Section Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Section</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={selectedClassId}
              label="Select Class"
              onChange={(e) => setSelectedClassId(e.target.value)}
              sx={{
                bgcolor: "#f5faff",
                borderRadius: 2,
                fontWeight: 600,
                color: theme.palette.secondary.dark,
              }}
            >
              {schoolClasses.map((cls) => (
                <MenuItem key={cls.id} value={cls.id!}>
                  Class {cls.classSymbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Section Name"
            fullWidth
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddSection();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddSection}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
