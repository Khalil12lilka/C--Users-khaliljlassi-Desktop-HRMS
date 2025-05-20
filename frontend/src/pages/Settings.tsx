import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Paramètres du système</h2>
      <p className="text-gray-600 mb-2">Page de configuration du système RH. (À personnaliser selon vos besoins)</p>
      <div className="mt-6">
        <label className="block mb-2 font-medium">Nom de l'entreprise</label>
        <input className="w-full border rounded px-3 py-2" placeholder="Exemple : HRMS Pro" />
      </div>
      <div className="mt-4">
        <label className="block mb-2 font-medium">Email de contact</label>
        <input className="w-full border rounded px-3 py-2" placeholder="contact@entreprise.com" />
      </div>
      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Enregistrer</button>
    </div>
  );
};
export default Settings; 