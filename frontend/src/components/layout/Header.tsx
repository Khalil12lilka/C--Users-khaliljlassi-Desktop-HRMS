import React from 'react';
import { BellIcon, MenuIcon, SearchIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();
  return <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center md:hidden">
        <button className="text-gray-500 hover:text-gray-700">
          <MenuIcon size={24} />
        </button>
      </div>
      <div className="flex-1 max-w-md ml-4">
        <div className="relative">
          <input type="text" placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <SearchIcon size={18} />
          </div>
        </div>
      </div>
      {user.role === 'ADMIN_RH' && (
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-500 hover:text-gray-700">
          <BellIcon size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden">
            {user.avatar
              ? <img src={user.avatar} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
              : <UserIcon size={18} />}
          </div>
          <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium">{user.name}</p>
            </div>
          </div>
        </div>
      )}
    </header>;
};
export default Header;