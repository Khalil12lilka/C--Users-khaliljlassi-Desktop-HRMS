export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  hireDate: string;
  status: 'active' | 'onLeave' | 'terminated';
}
export interface EmployeeCreate extends Omit<Employee, 'id'> {}
export interface EmployeeUpdate extends Partial<Employee> {}