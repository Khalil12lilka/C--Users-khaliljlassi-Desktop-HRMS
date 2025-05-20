import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center mb-2 text-3xl font-bold">
            HR
          </div>
          <h1 className="text-2xl font-bold mb-1">Connexion RHMS Pro</h1>
          <p className="text-gray-500 text-sm">Veuillez vous connecter à votre compte</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" placeholder="admin@entreprise.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-6 relative">
            <label className="block mb-1 font-medium">Mot de passe</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border rounded px-3 py-2 pr-10"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-semibold">Se connecter</button>
        </form>
      </div>
    </div>
  );
};
export default Login; 