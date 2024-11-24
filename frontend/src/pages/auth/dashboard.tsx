import React, { useState } from 'react';
import Rooms from '../../components/Rooms';
import Playlists from '../../components/Playlists'; 

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'playlists'>('rooms');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'rooms' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('rooms')}
        >
          Rooms
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'playlists' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('playlists')}
        >
          Playlists
        </button>
      </div>
      <div>
        {activeTab === 'rooms' && <Rooms />}
        {activeTab === 'playlists' && <Playlists />}
      </div>
    </div>
  );
};

export default Dashboard;
