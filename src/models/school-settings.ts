export interface ClassItem {
  id?: string;
  className: string;
  classSymbol: number;
}

export interface SectionsDto {
  id?: string;
  sectionName?: string;
  classId: string;
}

export interface SubjectDto {
  id: string;
  subjectName: string;
  subjectCode: string;
  classId: string;
}

export interface CreateSubjectDto {
  subjectName: string;
  subjectCode: string;
  classId: string;
}

export interface UpdateSubjectDto {
  id: string;
  subjectName: string;
  subjectCode: string;
  classId: string;
}

// Result Card DTOs
export interface ResultEntryDto {
  id: string;
  subjectId: string;
  subjectName: string;
  totalMarks: number;
  obtainedMarks: number;
  remarks?: string;
}

export interface CreateResultEntryDto {
  subjectId: string;
  totalMarks: number;
  obtainedMarks: number;
  remarks?: string;
}

export interface UpdateResultEntryDto {
  id: string;
  obtainedMarks: number;
  remarks?: string;
}

export interface ResultCardDto {
  id: string;
  examTitle: string;
  examDate: string; // ISO date string
  studentId: string;
  classId: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  remarks: string;
  resultEntries: ResultEntryDto[];
}

export interface CreateResultCardDto {
  examTitle: string;
  examDate: string;
  studentId: string;
  classId: string;
  remarks: string;
  resultEntries: CreateResultEntryDto[];
}

export interface UpdateResultCardDto {
  id: string;
  examTitle: string;
  examDate: string; // ISO date string
  remarks: string;
}
