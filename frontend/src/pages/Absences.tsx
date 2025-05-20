import React, { useState } from 'react';
import { PlusIcon, CalendarIcon, CheckIcon, XIcon } from 'lucide-react';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
interface Absence {
  id: number;
  employeeName: string;
  type: 'congé' | 'maladie' | 'formation' | 'autre';
  startDate: string;
  endDate: string;
  status: 'approved' | 'pending' | 'rejected';
  notes?: string;
}
const mockAbsences: Absence[] = [{
  id: 1,
  employeeName: 'Sophie Martin',
  type: 'congé',
  startDate: '15/07/2023',
  endDate: '25/07/2023',
  status: 'approved'
}, {
  id: 2,
  employeeName: 'Thomas Bernard',
  type: 'maladie',
  startDate: '03/08/2023',
  endDate: '05/08/2023',
  status: 'approved'
}, {
  id: 3,
  employeeName: 'Emma Dubois',
  type: 'formation',
  startDate: '10/09/2023',
  endDate: '12/09/2023',
  status: 'pending'
}, {
  id: 4,
  employeeName: 'Lucas Petit',
  type: 'congé',
  startDate: '22/09/2023',
  endDate: '30/09/2023',
  status: 'pending'
}, {
  id: 5,
  employeeName: 'Chloé Leroy',
  type: 'autre',
  startDate: '05/10/2023',
  endDate: '05/10/2023',
  status: 'approved',
  notes: 'Rendez-vous médical'
}, {
  id: 6,
  employeeName: 'Hugo Moreau',
  type: 'congé',
  startDate: '20/12/2023',
  endDate: '31/12/2023',
  status: 'pending'
}, {
  id: 7,
  employeeName: 'Léa Fournier',
  type: 'maladie',
  startDate: '08/08/2023',
  endDate: '12/08/2023',
  status: 'rejected'
}, {
  id: 8,
  employeeName: 'Gabriel Simon',
  type: 'formation',
  startDate: '18/09/2023',
  endDate: '22/09/2023',
  status: 'approved'
}];
const Absences: React.FC = () => {
  const [absences] = useState<Absence[]>(mockAbsences);
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending'>('all');
  const filteredAbsences = selectedTab === 'all' ? absences : absences.filter(absence => absence.status === 'pending');
  const columns = [{
    header: 'Employé',
    accessor: 'employeeName'
  }, {
    header: 'Type',
    accessor: (absence: Absence) => {
      const typeClasses = {
        congé: 'bg-blue-100 text-blue-800',
        maladie: 'bg-red-100 text-red-800',
        formation: 'bg-purple-100 text-purple-800',
        autre: 'bg-gray-100 text-gray-800'
      };
      const typeLabels = {
        congé: 'Congé',
        maladie: 'Maladie',
        formation: 'Formation',
        autre: 'Autre'
      };
      return <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeClasses[absence.type]}`}>
            {typeLabels[absence.type]}
          </span>;
    }
  }, {
    header: 'Début',
    accessor: 'startDate'
  }, {
    header: 'Fin',
    accessor: 'endDate'
  }, {
    header: 'Statut',
    accessor: (absence: Absence) => {
      const statusClasses = {
        approved: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        rejected: 'bg-red-100 text-red-800'
      };
      const statusLabels = {
        approved: 'Approuvé',
        pending: 'En attente',
        rejected: 'Rejeté'
      };
      return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[absence.status]}`}>
            {statusLabels[absence.status]}
          </span>;
    }
  }, {
    header: 'Actions',
    accessor: (absence: Absence) => {
      if (absence.status === 'pending') {
        return <div className="flex space-x-2">
              <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                <CheckIcon size={16} />
              </button>
              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                <XIcon size={16} />
              </button>
            </div>;
      }
      return null;
    },
    className: 'text-right'
  }];
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Gestion des absences
          </h1>
          <p className="text-gray-500">
            Gérez les congés, maladies et autres absences
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" icon={<PlusIcon size={16} />}>
            Nouvelle demande
          </Button>
        </div>
      </div>
      <Card>
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-6">
            <button className={`pb-4 px-1 ${selectedTab === 'all' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'}`} onClick={() => setSelectedTab('all')}>
              Toutes les absences
            </button>
            <button className={`pb-4 px-1 ${selectedTab === 'pending' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'}`} onClick={() => setSelectedTab('pending')}>
              En attente d'approbation
            </button>
          </nav>
        </div>
        <Table columns={columns} data={filteredAbsences} />
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Calendrier des absences" className="md:col-span-2">
          <div className="flex items-center justify-center h-80">
            <div className="flex flex-col items-center text-gray-500">
              <CalendarIcon size={48} className="mb-2" />
              <p>Calendrier des absences</p>
              <p className="text-sm">Visualisez les absences de l'équipe</p>
            </div>
          </div>
        </Card>
      </div>
    </div>;
};
export default Absences;