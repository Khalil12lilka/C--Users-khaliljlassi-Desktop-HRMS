import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, UsersIcon, CalendarIcon, TrendingUpIcon, FileTextIcon, LogOutIcon, SettingsIcon, MessagesSquareIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navItems = [{
    path: '/',
    label: 'Tableau de bord',
    icon: <LayoutDashboardIcon size={20} />
  }, {
    path: '/employees',
    label: 'Employés',
    icon: <UsersIcon size={20} />
  }, {
    path: '/absences',
    label: 'Absences',
    icon: <CalendarIcon size={20} />
  }, {
    path: '/performance',
    label: 'Performances',
    icon: <TrendingUpIcon size={20} />
  }, {
    path: '/reports',
    label: 'Rapports',
    icon: <FileTextIcon size={20} />
  }, {
    path: '/social',
    label: 'Social',
    icon: <MessagesSquareIcon size={20} />
  }];
  return <aside className="hidden md:flex flex-col w-64 bg-blue-800 text-white">
      <div className="p-4 border-b border-blue-700">
        <h1 className="text-xl font-bold">HRMS Pro</h1>
      </div>
      <nav className="flex-1 pt-4">
        <ul>
          {navItems.map(item => <li key={item.path}>
              <Link to={item.path} className={`flex items-center py-3 px-4 ${location.pathname === item.path ? 'bg-blue-700 font-medium' : 'hover:bg-blue-700'}`}>
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>)}
        </ul>
      </nav>
      {user.role === 'ADMIN_RH' && (
      <div className="p-4 border-t border-blue-700">
          <Link to="/settings" className="flex items-center w-full py-2 px-4 hover:bg-blue-700 rounded">
          <SettingsIcon size={20} className="mr-3" />
          Paramètres
          </Link>
          <button className="flex items-center w-full py-2 px-4 hover:bg-blue-700 rounded mt-2" onClick={logout}>
          <LogOutIcon size={20} className="mr-3" />
          Déconnexion
        </button>
      </div>
      )}
    </aside>;
};
export default Sidebar;