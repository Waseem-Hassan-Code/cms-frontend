// src/pages/admissions/hooks/useMockAdmissions.ts
import { useState, useEffect } from "react";
import type { AdmissionRecord } from "./admission-types";

const useMockAdmissions = () => {
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAdmissions(generateMockAdmissions());
      setLoading(false);
    }, 500);
  }, []);

  return { admissions, loading };
};

const generateMockAdmissions = (): AdmissionRecord[] => {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: 50 }, (_, i) => ({
    id: `adm${1000 + i}`,
    firstName: `Student`,
    lastName: `${i + 1}`,
    gender: i % 2 === 0 ? "Male" : "Female",
    dateOfBirth: new Date(currentYear - 10 - (i % 10), i % 12, (i % 28) + 1),
    nationality: "Pakistani",
    religion: i % 2 === 0 ? "Islam" : "Christianity",
    bloodGroup: ["A+", "B+", "O+", "AB+"][i % 4],
    email: `student${i + 1}@example.com`,
    phone: `0300${String(1000000 + i).slice(-7)}`,
    address: `House #${i + 1}, Street ${i % 10}, City`,
    city: ["Karachi", "Lahore", "Islamabad", "Peshawar"][i % 4],
    postalCode: `${75000 + i}`,
    country: "Pakistan",
    fatherName: `Father ${i + 1}`,
    fatherOccupation: ["Business", "Service", "Doctor", "Engineer"][i % 4],
    fatherPhone: `0300${String(2000000 + i).slice(-7)}`,
    motherName: `Mother ${i + 1}`,
    guardianEmail: `guardian${i + 1}@example.com`,
    admissionFee: 5000 + i * 100,
    tuitionFee: 3000 + i * 50,
    paymentMethod: ["Cash", "Bank Transfer", "Online Payment"][i % 3],
    remarks: i % 3 === 0 ? "Special case" : "",
    admissionDate: new Date(currentYear, i % 12, (i % 28) + 1),
    registrationNumber: `REG-${currentYear}${String(i + 1).padStart(4, "0")}`,
    isActive: i % 5 !== 0,
    previousSchool: i % 4 === 0 ? "ABC School" : "XYZ Academy",
    previousClass: `Class ${(i % 5) + 1}`,
    profileImageUrl: `https://i.pravatar.cc/150?img=${i % 70}`,
    CNICNumber: `42101${String(1000000 + i).slice(-7)}`,
    birthCertificateNo: `BC${currentYear}${String(i + 1).padStart(4, "0")}`,
    status: i % 5 === 0 ? "Inactive" : "Active",
    studentPayment: [],
  }));
};

export default useMockAdmissions;
