import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
const data = [{
  name: 'Jan',
  count: 45
}, {
  name: 'Fév',
  count: 52
}, {
  name: 'Mar',
  count: 49
}, {
  name: 'Avr',
  count: 62
}, {
  name: 'Mai',
  count: 55
}, {
  name: 'Juin',
  count: 67
}, {
  name: 'Juil',
  count: 60
}, {
  name: 'Août',
  count: 58
}, {
  name: 'Sep',
  count: 65
}, {
  name: 'Oct',
  count: 71
}, {
  name: 'Nov',
  count: 68
}, {
  name: 'Déc',
  count: 72
}];
const EmployeeChart: React.FC = () => {
  return <Card title="Évolution des effectifs" className="h-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 20
        }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{
            fontSize: 12
          }} />
            <YAxis tick={{
            fontSize: 12
          }} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>;
};
export default EmployeeChart;