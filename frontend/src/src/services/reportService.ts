import { API_ENDPOINTS } from '../config/api';
import { fetchApi } from './api';
export interface ReportParams {
  startDate?: string;
  endDate?: string;
  type?: string;
  department?: string;
}
export const reportService = {
  generateReport: (type: string, params: ReportParams) => fetchApi<Blob>(`${API_ENDPOINTS.reports}/generate/${type}`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Accept': 'application/pdf'
    }
  }),
  downloadReport: (reportId: string) => fetchApi<Blob>(`${API_ENDPOINTS.reports}/download/${reportId}`, {
    headers: {
      'Accept': 'application/pdf'
    }
  })
};