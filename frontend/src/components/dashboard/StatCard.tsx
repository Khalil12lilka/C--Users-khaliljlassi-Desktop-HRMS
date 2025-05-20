import React from 'react';
import Card from '../common/Card';
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red';
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-500',
    green: 'bg-green-50 text-green-500',
    yellow: 'bg-yellow-50 text-yellow-500',
    red: 'bg-red-50 text-red-500'
  };
  return <Card className="h-full">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
            {change && <span className={`ml-2 text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change.isPositive ? '+' : ''}
                {change.value}%
              </span>}
          </div>
        </div>
      </div>
    </Card>;
};
export default StatCard;