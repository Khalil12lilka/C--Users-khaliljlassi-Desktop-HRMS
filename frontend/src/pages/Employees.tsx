import React, { useState, useEffect } from 'react';
import { PlusIcon, SearchIcon, FilterIcon, DownloadIcon } from 'lucide-react';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { API_URL } from '../config';

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  email: string;
  hireDate: string;
  status: 'active' | 'onLeave' | 'terminated';
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phoneNumber?: string;
  };
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    email: '',
    hireDate: '',
    status: 'active',
  });
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API_URL}/api/employees`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      fetchEmployees();
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/employees/search?query=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    }
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    try {
      const response = await fetch(`${API_URL}/api/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(addForm)
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout de l\'employé');
      setShowAddModal(false);
      setAddForm({
        firstName: '',
        lastName: '',
        position: '',
        department: '',
        email: '',
        hireDate: '',
        status: 'active',
      });
      fetchEmployees();
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout');
    }
  };

  const columns = [
    {
      header: 'Nom',
      accessor: (employee: Employee) => `${employee.firstName} ${employee.lastName}`
    },
    {
      header: 'Poste',
      accessor: (employee: Employee) => employee.position
    },
    {
      header: 'Département',
      accessor: (employee: Employee) => employee.department
    },
    {
      header: 'Email',
      accessor: (employee: Employee) => employee.email
    },
    {
      header: "Date d'embauche",
      accessor: (employee: Employee) => new Date(employee.hireDate).toLocaleDateString()
    },
    {
      header: 'Statut',
      accessor: (employee: Employee) => {
        const statusClasses = {
          active: 'bg-green-100 text-green-800',
          onLeave: 'bg-yellow-100 text-yellow-800',
          terminated: 'bg-red-100 text-red-800'
        };
        const statusLabels = {
          active: 'Actif',
          onLeave: 'En congé',
          terminated: 'Terminé'
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[employee.status]}`}>
            {statusLabels[employee.status]}
          </span>
        );
      }
    }
  ];

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Gestion des employés
          </h1>
          <p className="text-gray-500">
            Gérez les profils et les informations des employés
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" icon={<PlusIcon size={16} />} onClick={() => setShowAddModal(true)}>
            Ajouter un employé
          </Button>
        </div>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Rechercher un employé..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <SearchIcon size={18} />
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" size="sm" icon={<FilterIcon size={16} />}>
              Filtrer
            </Button>
            <Button variant="secondary" size="sm" icon={<DownloadIcon size={16} />}>
              Exporter
            </Button>
          </div>
        </div>

        <Table columns={columns} data={employees} onRowClick={handleRowClick} />
      </Card>

      {selectedEmployee && (
        <Card title={`Profil de ${selectedEmployee.firstName} ${selectedEmployee.lastName}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Informations personnelles
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p className="font-medium">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium">{selectedEmployee.phoneNumber || 'Non renseigné'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date d'embauche</p>
                  <p className="font-medium">
                    {new Date(selectedEmployee.hireDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Informations professionnelles
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Poste</p>
                  <p className="font-medium">{selectedEmployee.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Département</p>
                  <p className="font-medium">{selectedEmployee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <p className="font-medium">
                    {selectedEmployee.status === 'active'
                      ? 'Actif'
                      : selectedEmployee.status === 'onLeave'
                      ? 'En congé'
                      : 'Terminé'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Ajouter un employé</h2>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div className="flex space-x-2">
                <input name="firstName" value={addForm.firstName} onChange={handleAddChange} required placeholder="Prénom" className="w-1/2 border rounded px-2 py-1" />
                <input name="lastName" value={addForm.lastName} onChange={handleAddChange} required placeholder="Nom" className="w-1/2 border rounded px-2 py-1" />
              </div>
              <input name="position" value={addForm.position} onChange={handleAddChange} required placeholder="Poste" className="w-full border rounded px-2 py-1" />
              <input name="department" value={addForm.department} onChange={handleAddChange} required placeholder="Département" className="w-full border rounded px-2 py-1" />
              <input name="email" value={addForm.email} onChange={handleAddChange} required placeholder="Email" type="email" className="w-full border rounded px-2 py-1" />
              <input name="hireDate" value={addForm.hireDate} onChange={handleAddChange} required placeholder="Date d'embauche (YYYY-MM-DD)" type="date" className="w-full border rounded px-2 py-1" />
              <select name="status" value={addForm.status} onChange={handleAddChange} className="w-full border rounded px-2 py-1">
                <option value="active">Actif</option>
                <option value="onLeave">En congé</option>
                <option value="terminated">Terminé</option>
              </select>
              {addError && <div className="text-red-500 text-sm">{addError}</div>}
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-200 rounded">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;