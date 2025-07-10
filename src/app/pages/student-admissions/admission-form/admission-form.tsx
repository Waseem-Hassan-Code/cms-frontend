// src/pages/admissions/components/AdmissionForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Stepper, Step, StepLabel, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import PersonalInfoStep from "./personal-info";
import ContactInfoStep from "./contact-info";
import GuardianInfoStep from "./guardian-info";
import FeeInfoStep from "./fee-info";
import type { AppDispatch } from "../../../../redux/store";
import type { AdmissionFormData } from "../types-hooks/admission-types";
import { admitStudent } from "../../../../redux/student-admission/student-admission-thunks";
import PreviousAcademia from "./previous-academia";
import { toast } from "sonner";

const steps = [
  "Personal Info",
  "Contact Info",
  "Guardian Info",
  "Academia Info",
  "Fee Details",
];

const AdmissionForm = ({ onClose }: { onClose: () => void }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const [studentAdmitted, setStudentAdmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<AdmissionFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "Female",
      dateOfBirth: "",
      nationality: "Pakistani",
      religion: "Islam",
      bloodGroup: "",

      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Pakistan",

      admissionDate: "",
      previousSchool: "",
      previousClass: "",
      registrationNumber: "",
      isActive: true,

      fatherName: "",
      fatherOccupation: "",
      fatherPhone: "",
      motherName: "",
      guardianEmail: "",

      profileImageUrl: "",
      cnicNumber: "",
      birthCertificateNo: "",
      remarks: "",
    },
  });

  const handleNext = async () => {
    console.log("Active Step:", activeStep);
    let isValid = false;
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
        isValid = await trigger([
          "email",
          "phone",
          "address",
          "city",
          "country",
        ]);
        break;
      case 2:
        isValid = await trigger(["fatherName", "fatherPhone"]);
        break;
      case 3:
        isValid = await trigger([
          "admissionDate",
          "previousSchool",
          "previousClass",
          "registrationNumber",
        ]);
        if (isValid) {
          handleSubmit(onSubmit)();
          return;
        }
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data: AdmissionFormData) => {
    try {
      if (activeStep == steps.length - 2 && !studentAdmitted) {
        const result = await dispatch(admitStudent(data)).unwrap();
        if (result.isSuccess) {
          toast.success("Admission submitted successfully!");
          setStudentAdmitted(true);
        } else {
          toast.error(`Error submitting admission: ${result.message}`);
          return;
        }
      }

      setActiveStep((prev) => prev + 1);
    } catch (err: any) {
      toast.error(`Error submitting admission: ${err.message}`);
    }
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
        {activeStep === 3 && (
          <PreviousAcademia control={control} errors={errors} />
        )}

        {activeStep === 4 && <FeeInfoStep control={control} errors={errors} />}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={activeStep === 0 ? onClose : handleBack}
            sx={{ px: 4 }}
          >
            {activeStep === 0 ? "Cancel" : "Back"}
          </Button>

          {activeStep < steps.length - 2 ? (
            <Button variant="contained" onClick={handleNext} sx={{ px: 4 }}>
              Next
            </Button>
          ) : activeStep == steps.length - 2 ? (
            <Button variant="contained" onClick={handleNext} sx={{ px: 4 }}>
              Admit Student
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
