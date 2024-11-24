import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms, createRoom, addPlaylistToRoom, fetchPlaylists } from '../redux/slices/roomsSlice';
import { RootState, AppDispatch } from '../redux/store';

const Rooms: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const playlists = useSelector((state: RootState) => state.rooms.playlists);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomOwner, setNewRoomOwner] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchPlaylists());
  }, [dispatch]);

  const handleCreateRoom = () => {
    const roomData = { name: newRoomName, owner: newRoomOwner, participants: [] };
    dispatch(createRoom(roomData));
  };

  const handleAddPlaylist = (roomId: string) => {
    if (selectedPlaylistId) {
      dispatch(addPlaylistToRoom({ roomId, playlistId: selectedPlaylistId }));
      setIsModalOpen(false); 
    } else {
      console.error('No playlist selected');
    }
  };

  const handleRoomClick = (roomId: string) => {
    console.log('Room clicked:', roomId); 
    setSelectedRoomId(roomId);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedPlaylistId(''); 
  };

  console.log('Rooms:', rooms); 

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Rooms</h1>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Room Name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Owner"
          value={newRoomOwner}
          onChange={(e) => setNewRoomOwner(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleCreateRoom}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Room
        </button>
      </div>

      {/* Display Rooms */}
      <ul className="mt-4">
        {rooms.map((room) => (
          <li key={room._id} className="py-2"> 
            <strong>{room.name}</strong> (Owner: {room.owner})
            <button
              onClick={() => handleRoomClick(room._id)} 
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add Playlist
            </button>
            <div className="mt-2">
              {room.playlists.map((playlistId) => (
                <p key={playlistId}>Playlist ID: {playlistId}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedRoomId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Select Playlist for Room</h2>
            <select
              value={selectedPlaylistId}
              onChange={(e) => setSelectedPlaylistId(e.target.value)}
              className="border p-2 rounded mb-4 w-full"
            >
              <option value="">Select Playlist</option>
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </option>
                ))
              ) : (
                <option value="">No playlists available</option>
              )}
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddPlaylist(selectedRoomId!)} 
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Playlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
