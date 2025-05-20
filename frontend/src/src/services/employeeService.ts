import { API_ENDPOINTS } from '../config/api';
import { Employee, EmployeeCreate, EmployeeUpdate } from '../types/employee';
import { fetchApi } from './api';
export const employeeService = {
  getAll: () => fetchApi<Employee[]>(API_ENDPOINTS.employees),
  getById: (id: number) => fetchApi<Employee>(`${API_ENDPOINTS.employees}/${id}`),
  create: (employee: EmployeeCreate) => fetchApi<Employee>(API_ENDPOINTS.employees, {
    method: 'POST',
    body: JSON.stringify(employee)
  }),
  update: (id: number, employee: EmployeeUpdate) => fetchApi<Employee>(`${API_ENDPOINTS.employees}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(employee)
  }),
  delete: (id: number) => fetchApi<void>(`${API_ENDPOINTS.employees}/${id}`, {
    method: 'DELETE'
  })
};