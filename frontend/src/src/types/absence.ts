export interface Absence {
  id: number;
  employeeName: string;
  type: 'congé' | 'maladie' | 'formation' | 'autre';
  startDate: string;
  endDate: string;
  status: 'approved' | 'pending' | 'rejected';
  notes?: string;
}
export interface AbsenceCreate extends Omit<Absence, 'id'> {}
export interface AbsenceUpdate extends Partial<Absence> {}