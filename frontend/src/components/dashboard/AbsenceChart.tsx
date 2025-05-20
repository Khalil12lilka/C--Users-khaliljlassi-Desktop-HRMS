import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from '../common/Card';
const data = [{
  name: 'Congés payés',
  value: 45
}, {
  name: 'Maladie',
  value: 25
}, {
  name: 'Formation',
  value: 15
}, {
  name: 'Autres',
  value: 15
}];
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
const AbsenceChart: React.FC = () => {
  return <Card title="Répartition des absences" className="h-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>;
};
export default AbsenceChart;