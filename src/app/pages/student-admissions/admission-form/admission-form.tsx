import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Stepper, Step, StepLabel, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfoStep from "./personal-info";
import ContactInfoStep from "./contact-info";
import GuardianInfoStep from "./guardian-info";
import FeeInfoStep from "./fee-info";
import type { AppDispatch, RootState } from "../../../../redux/store";
import type {
  AdmissionFormData,
  FeeInfoData,
} from "../types-hooks/admission-types";
import {
  admitStudent,
  getStudentById,
} from "../../../../redux/student-admission/student-admission-thunks";
import PreviousAcademia from "./previous-academia";
import { toast } from "sonner";
import { addFeeVoucher } from "../../../../redux/fee-details/fee-detail-thunk";
import type { StudentFeeVoucher } from "../../../../models/fee-details";

const steps = [
  "Personal Info",
  "Contact Info",
  "Guardian Info",
  "Academia Info",
  "Fee Details",
];

const AdmissionForm = ({ onClose }: { onClose: () => void }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [studentAdmitted, setStudentAdmitted] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { studentId, studentForm } = useSelector(
    (state: RootState) => state.studentAdmission
  );

  useEffect(() => {
    if (studentId) {
      dispatch(getStudentById(studentId));
    }
  }, [studentId]);

  const {
    control: admissionControl,
    handleSubmit: handleAdmissionSubmit,
    formState: { errors: admissionErrors },
    trigger,
    reset,
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

  const {
    control: feeControl,
    handleSubmit: handleFeeSubmit,
    formState: { errors: feeErrors },
  } = useForm<FeeInfoData>({
    defaultValues: {
      selectedFeeTypes: [],
      tuitionFee: 0,
      remarks: "",
    },
  });

  useEffect(() => {
    if (studentForm?.data) {
      toast.info("Editing existing student...");

      reset({
        ...studentForm.data,
      });

      setStudentAdmitted(true);
      setActiveStep(studentForm.data.activeStep || 0);
    }
  }, [studentForm, reset]);

  const handleNext = async () => {
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
          handleAdmissionSubmit(onAdmissionSubmit)();
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

  const onAdmissionSubmit = async (data: AdmissionFormData) => {
    try {
      data.activeStep = activeStep;

      // Handle update or new admission
      if (!studentAdmitted) {
        const result = await dispatch(admitStudent(data)).unwrap();
        if (result.isSuccess) {
          toast.success("Admission submitted successfully!");
          setStudentAdmitted(true);
          setActiveStep((prev) => prev + 1);
        } else {
          toast.error(`Error submitting admission: ${result.message}`);
        }
      } else {
        toast.info("Already admitted. Ready for fee submission.");
        setActiveStep((prev) => prev + 1);
      }
    } catch (err: any) {
      toast.error(`Error submitting admission: ${err.message}`);
    }
  };

  const onSubmitFee = async (data: FeeInfoData) => {
    try {
      var obj: StudentFeeVoucher = {
        studentId: studentId!,
        feeVoucherItems: data.selectedFeeTypes,
        tutionFee: data.tuitionFee,
        remarks: data.remarks,
      };

      dispatch(addFeeVoucher(obj))
        .unwrap()
        .then((result) => {
          if (result.isSuccess) {
            onClose();
            toast.success(result.message);
          }
        })
        .catch((error) => {
          toast.error(`Error adding fee voucher: ${error.message}`);
        });
    } catch (err: any) {
      toast.error("Error submitting fee information.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={index < activeStep}
            onClick={() => setActiveStep(index)}
            sx={{
              cursor: "pointer",
              "& .MuiStepLabel-label": {
                color: activeStep === index ? "green" : "inherit",
                fontWeight: activeStep === index ? "bold" : "normal",
              },
            }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep < 4 && (
        <Box
          component="form"
          onSubmit={handleAdmissionSubmit(onAdmissionSubmit)}
        >
          {activeStep === 0 && (
            <PersonalInfoStep
              control={admissionControl}
              errors={admissionErrors}
            />
          )}
          {activeStep === 1 && (
            <ContactInfoStep
              control={admissionControl}
              errors={admissionErrors}
            />
          )}
          {activeStep === 2 && (
            <GuardianInfoStep
              control={admissionControl}
              errors={admissionErrors}
            />
          )}
          {activeStep === 3 && (
            <PreviousAcademia
              control={admissionControl}
              errors={admissionErrors}
            />
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              onClick={activeStep === 0 ? onClose : handleBack}
              sx={{ px: 4 }}
            >
              {activeStep === 0 ? "Cancel" : "Back"}
            </Button>
            <Button variant="contained" onClick={handleNext} sx={{ px: 4 }}>
              {activeStep === steps.length - 2
                ? studentAdmitted
                  ? "Continue"
                  : "Admit Student"
                : "Next"}
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 4 && (
        <Box component="form" onSubmit={handleFeeSubmit(onSubmitFee)}>
          <FeeInfoStep control={feeControl} errors={feeErrors} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ px: 4 }}>
              Back
            </Button>
            <Button variant="contained" type="submit" sx={{ px: 4 }}>
              Submit Admission
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default AdmissionForm;
