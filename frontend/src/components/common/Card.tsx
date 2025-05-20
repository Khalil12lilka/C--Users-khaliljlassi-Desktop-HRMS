import React from 'react';
interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}
const Card: React.FC<CardProps> = ({
  title,
  children,
  className = ''
}) => {
  return <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      {title && <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">{title}</h3>
        </div>}
      <div className="p-5">{children}</div>
    </div>;
};
export default Card;