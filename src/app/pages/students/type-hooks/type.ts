// src/pages/students/types/studentTypes.ts
export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  fatherName: string;
  motherName: string;
  contactNumber: string;
  address: string;
  admissionDate: string;
  avatar?: string;
}

export interface Filters {
  class: string;
  section: string;
  search: string;
}
