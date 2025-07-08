// src/pages/admissions/components/AdmissionForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
} from "@mui/material";
import type { AdmissionFormData } from "../types-hooks/admission-types";
import PersonalInfoStep from "./personal-info";
import ContactInfoStep from "./contact-info";
import GuardianInfoStep from "./guardian-info";
import FeeInfoStep from "./fee-info";

const steps = ["Personal Info", "Contact Info", "Guardian Info", "Fee Details"];

const AdmissionForm = ({ onClose }: { onClose: () => void }) => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<AdmissionFormData>();

  const handleNext = async () => {
    let isValid = false;

    // Validate current step fields
    switch (activeStep) {
      case 0:
        isValid = await trigger([
          "firstName",
          "lastName",
          "gender",
          "dateOfBirth",
        ]);
        break;
      case 1:
        isValid = await trigger(["phone", "address", "city", "country"]);
        break;
      case 2:
        isValid = await trigger(["fatherName", "fatherPhone"]);
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data: AdmissionFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission
    onClose();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <PersonalInfoStep control={control} errors={errors} />
        )}
        {activeStep === 1 && (
          <ContactInfoStep control={control} errors={errors} />
        )}
        {activeStep === 2 && (
          <GuardianInfoStep control={control} errors={errors} />
        )}
        {activeStep === 3 && <FeeInfoStep control={control} errors={errors} />}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={activeStep === 0 ? onClose : handleBack}
            sx={{ px: 4 }}
          >
            {activeStep === 0 ? "Cancel" : "Back"}
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext} sx={{ px: 4 }}>
              Next
            </Button>
          ) : (
            <Button variant="contained" type="submit" sx={{ px: 4 }}>
              Submit Admission
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default AdmissionForm;
