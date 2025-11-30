import React, { useState, useEffect } from 'react';
import MoodEntry from '../components/MoodEntry';
import apiClient from '../api/client';

const MoodTracker = () => {
  const [studentId] = useState(() => {
    // Get from localStorage or URL params
    const stored = localStorage.getItem('studentId');
    return stored || '1'; // fallback to demo ID
  });

  const [moodEntries, setMoodEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editMood, setEditMood] = useState(3);
  const [editNotes, setEditNotes] = useState('');

  const moodLabels = {
    1: '😢 Very Bad',
    2: '😕 Bad',
    3: '😐 Neutral',
    4: '🙂 Good',
    5: '😄 Excellent'
  };

  // Fetch mood entries
  const fetchMoods = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getMoodEntries(studentId);
      if (res.success) {
        setMoodEntries(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch moods', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, [studentId]);

  // Handle new mood entry added
  const handleMoodAdded = (newMood) => {
    setMoodEntries([newMood, ...moodEntries]);
  };

  // Start editing
  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditMood(entry.mood);
    setEditNotes(entry.notes);
  };

  // Save edited mood
  const handleSaveEdit = async (id) => {
    try {
      const res = await apiClient.updateMoodEntry(id, parseInt(editMood), editNotes);
      if (res.success) {
        setMoodEntries(moodEntries.map(m => m._id === id ? res.data : m));
        setEditingId(null);
      }
    } catch (err) {
      console.error('Failed to update mood', err);
    }
  };

  // Delete mood entry
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mood entry?')) {
      try {
        const res = await apiClient.deleteMoodEntry(id);
        if (res.success) {
          setMoodEntries(moodEntries.filter(m => m._id !== id));
        }
      } catch (err) {
        console.error('Failed to delete mood', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Mental Health & Mood Tracker</h1>

        {/* Mood Entry Form */}
        <div className="mb-8">
          <MoodEntry studentId={studentId} onMoodAdded={handleMoodAdded} />
        </div>

        {/* Mood Entries List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Mood History</h2>

          {loading ? (
            <p className="text-gray-600 text-center py-8">Loading mood entries...</p>
          ) : moodEntries.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No mood entries yet. Start tracking your mood above!</p>
          ) : (
            <div className="space-y-3">
              {moodEntries.map((entry) => (
                <div key={entry._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  {editingId === entry._id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Mood:</label>
                        <select
                          value={editMood}
                          onChange={(e) => setEditMood(e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          {[1, 2, 3, 4, 5].map(m => (
                            <option key={m} value={m}>{moodLabels[m]}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Notes:</label>
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                          rows="2"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(entry._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">
                            {entry.mood === 1 ? '😢' : entry.mood === 2 ? '😕' : entry.mood === 3 ? '😐' : entry.mood === 4 ? '🙂' : '😄'}
                          </span>
                          <div>
                            <p className="font-bold text-lg text-gray-800">{moodLabels[entry.mood]}</p>
                            <p className="text-sm text-gray-500">{entry.date}</p>
                          </div>
                        </div>
                        {entry.notes && (
                          <p className="text-gray-700 mt-2 text-sm">{entry.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry._id)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {moodEntries.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Your Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map(m => {
                  const count = moodEntries.filter(e => e.mood === m).length;
                  return (
                    <div key={m} className="bg-gray-100 p-3 rounded-lg text-center">
                      <p className="text-2xl mb-1">{m === 1 ? '😢' : m === 2 ? '😕' : m === 3 ? '😐' : m === 4 ? '🙂' : '😄'}</p>
                      <p className="text-sm text-gray-700">{count} times</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
