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
