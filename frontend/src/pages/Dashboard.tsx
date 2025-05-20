import React from 'react';
import { UsersIcon, CalendarIcon, TrendingUpIcon, ClipboardIcon } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import EmployeeChart from '../components/dashboard/EmployeeChart';
import AbsenceChart from '../components/dashboard/AbsenceChart';
import PerformanceChart from '../components/dashboard/PerformanceChart';

const Dashboard: React.FC = () => {
  console.log('Dashboard component rendered');
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-500">Vue d'ensemble des indicateurs RH</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employés" value="275" icon={<UsersIcon size={24} />} change={{
        value: 5.2,
        isPositive: true
      }} color="blue" />
        <StatCard title="Taux d'absentéisme" value="3.2%" icon={<CalendarIcon size={24} />} change={{
        value: 0.8,
        isPositive: false
      }} color="yellow" />
        <StatCard title="Performance" value="87%" icon={<TrendingUpIcon size={24} />} change={{
        value: 2.1,
        isPositive: true
      }} color="green" />
        <StatCard title="Turnover" value="4.5%" icon={<ClipboardIcon size={24} />} change={{
        value: 1.2,
        isPositive: true
      }} color="red" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployeeChart />
        <AbsenceChart />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <PerformanceChart />
      </div>
    </div>;
};
export default Dashboard;