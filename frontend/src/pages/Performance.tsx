import React from 'react';
import { TrendingUpIcon, AwardIcon, TargetIcon, UsersIcon } from 'lucide-react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
interface PerformanceGoal {
  id: number;
  employeeName: string;
  goal: string;
  dueDate: string;
  progress: number;
  status: 'completed' | 'inProgress' | 'notStarted';
}
const mockPerformanceGoals: PerformanceGoal[] = [{
  id: 1,
  employeeName: 'Sophie Martin',
  goal: 'Compléter la formation React avancée',
  dueDate: '15/09/2023',
  progress: 75,
  status: 'inProgress'
}, {
  id: 2,
  employeeName: 'Thomas Bernard',
  goal: 'Finaliser le projet client XYZ',
  dueDate: '30/08/2023',
  progress: 100,
  status: 'completed'
}, {
  id: 3,
  employeeName: 'Emma Dubois',
  goal: "Améliorer les maquettes UX de l'application",
  dueDate: '10/10/2023',
  progress: 60,
  status: 'inProgress'
}, {
  id: 4,
  employeeName: 'Lucas Petit',
  goal: "Optimiser l'infrastructure DevOps",
  dueDate: '25/09/2023',
  progress: 30,
  status: 'inProgress'
}, {
  id: 5,
  employeeName: 'Chloé Leroy',
  goal: 'Lancer la nouvelle campagne marketing',
  dueDate: '05/11/2023',
  progress: 0,
  status: 'notStarted'
}];
interface TeamPerformance {
  department: string;
  teamSize: number;
  averageScore: number;
  goalCompletion: number;
  trend: 'up' | 'down' | 'stable';
}
const mockTeamPerformance: TeamPerformance[] = [{
  department: 'Technologie',
  teamSize: 12,
  averageScore: 87,
  goalCompletion: 92,
  trend: 'up'
}, {
  department: 'Marketing',
  teamSize: 8,
  averageScore: 82,
  goalCompletion: 78,
  trend: 'stable'
}, {
  department: 'Ventes',
  teamSize: 10,
  averageScore: 90,
  goalCompletion: 85,
  trend: 'up'
}, {
  department: 'Produit',
  teamSize: 6,
  averageScore: 85,
  goalCompletion: 80,
  trend: 'down'
}, {
  department: 'RH',
  teamSize: 4,
  averageScore: 88,
  goalCompletion: 90,
  trend: 'up'
}];
const Performance: React.FC = () => {
  const goalColumns = [{
    header: 'Employé',
    accessor: 'employeeName'
  }, {
    header: 'Objectif',
    accessor: 'goal'
  }, {
    header: 'Échéance',
    accessor: 'dueDate'
  }, {
    header: 'Progression',
    accessor: (goal: PerformanceGoal) => <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className={`h-2.5 rounded-full ${goal.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}`} style={{
        width: `${goal.progress}%`
      }}></div>
        </div>
  }, {
    header: 'Statut',
    accessor: (goal: PerformanceGoal) => {
      const statusClasses = {
        completed: 'bg-green-100 text-green-800',
        inProgress: 'bg-blue-100 text-blue-800',
        notStarted: 'bg-gray-100 text-gray-800'
      };
      const statusLabels = {
        completed: 'Terminé',
        inProgress: 'En cours',
        notStarted: 'Non commencé'
      };
      return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[goal.status]}`}>
            {statusLabels[goal.status]}
          </span>;
    }
  }];
  const teamColumns = [{
    header: 'Département',
    accessor: 'department'
  }, {
    header: 'Effectif',
    accessor: 'teamSize'
  }, {
    header: 'Score moyen',
    accessor: (team: TeamPerformance) => `${team.averageScore}/100`
  }, {
    header: 'Objectifs atteints',
    accessor: (team: TeamPerformance) => `${team.goalCompletion}%`
  }, {
    header: 'Tendance',
    accessor: (team: TeamPerformance) => {
      const trendIcons = {
        up: <TrendingUpIcon size={16} className="text-green-500" />,
        down: <TrendingUpIcon size={16} className="text-red-500 transform rotate-180" />,
        stable: <span className="text-gray-500">―</span>
      };
      return <div className="flex items-center">{trendIcons[team.trend]}</div>;
    }
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Évaluation des performances
        </h1>
        <p className="text-gray-500">
          Suivez les objectifs et les performances des équipes
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
              <AwardIcon size={24} />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Score global</p>
              <p className="text-2xl font-semibold text-gray-800">
                86<span className="text-lg">/100</span>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-500">Performance globale</span>
              <span className="text-sm font-medium text-gray-700">86%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{
              width: '86%'
            }}></div>
            </div>
          </div>
        </Card>
        <Card className="md:col-span-1">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-50 text-green-500">
              <TargetIcon size={24} />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">
                Objectifs atteints
              </p>
              <p className="text-2xl font-semibold text-gray-800">
                78<span className="text-lg">%</span>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-500">
                Progression des objectifs
              </span>
              <span className="text-sm font-medium text-gray-700">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{
              width: '78%'
            }}></div>
            </div>
          </div>
        </Card>
        <Card className="md:col-span-1">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-50 text-purple-500">
              <UsersIcon size={24} />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">
                Évaluations en cours
              </p>
              <p className="text-2xl font-semibold text-gray-800">12</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Prochaine échéance</span>
              <Button size="sm" variant="secondary">
                Voir tout
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Card title="Objectifs individuels">
        <Table columns={goalColumns} data={mockPerformanceGoals} />
        <div className="mt-4 flex justify-end">
          <Button variant="primary">Gérer les objectifs</Button>
        </div>
      </Card>
      <Card title="Performance des équipes">
        <Table columns={teamColumns} data={mockTeamPerformance} />
      </Card>
    </div>;
};
export default Performance;