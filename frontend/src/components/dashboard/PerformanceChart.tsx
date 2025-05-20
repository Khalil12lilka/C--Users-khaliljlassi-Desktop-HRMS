import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
const data = [{
  month: 'Jan',
  performance: 75
}, {
  month: 'Fév',
  performance: 78
}, {
  month: 'Mar',
  performance: 82
}, {
  month: 'Avr',
  performance: 79
}, {
  month: 'Mai',
  performance: 85
}, {
  month: 'Juin',
  performance: 88
}, {
  month: 'Juil',
  performance: 90
}, {
  month: 'Août',
  performance: 87
}, {
  month: 'Sep',
  performance: 91
}, {
  month: 'Oct',
  performance: 93
}, {
  month: 'Nov',
  performance: 89
}, {
  month: 'Déc',
  performance: 94
}];
const PerformanceChart: React.FC = () => {
  return <Card title="Performance moyenne des équipes" className="h-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 20
        }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{
            fontSize: 12
          }} />
            <YAxis domain={[60, 100]} tick={{
            fontSize: 12
          }} />
            <Tooltip />
            <Line type="monotone" dataKey="performance" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>;
};
export default PerformanceChart;