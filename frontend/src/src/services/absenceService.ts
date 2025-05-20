import { API_ENDPOINTS } from '../config/api';
import { Absence, AbsenceCreate, AbsenceUpdate } from '../types/absence';
import { fetchApi } from './api';
export const absenceService = {
  getAll: () => fetchApi<Absence[]>(API_ENDPOINTS.absences),
  getById: (id: number) => fetchApi<Absence>(`${API_ENDPOINTS.absences}/${id}`),
  create: (absence: AbsenceCreate) => fetchApi<Absence>(API_ENDPOINTS.absences, {
    method: 'POST',
    body: JSON.stringify(absence)
  }),
  update: (id: number, absence: AbsenceUpdate) => fetchApi<Absence>(`${API_ENDPOINTS.absences}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(absence)
  }),
  approve: (id: number) => fetchApi<Absence>(`${API_ENDPOINTS.absences}/${id}/approve`, {
    method: 'POST'
  }),
  reject: (id: number) => fetchApi<Absence>(`${API_ENDPOINTS.absences}/${id}/reject`, {
    method: 'POST'
  })
};