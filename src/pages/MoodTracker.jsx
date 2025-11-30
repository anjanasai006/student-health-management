import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import MoodEntry from '../components/MoodEntry';
import apiClient from '../api/client';

const MoodTracker = () => {
  const [studentId] = useState(() => {
    const stored = localStorage.getItem('studentId');
    return stored || '1';
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

  const handleMoodAdded = (newMood) => {
    setMoodEntries([newMood, ...moodEntries]);
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditMood(entry.mood);
    setEditNotes(entry.notes || '');
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      const res = await apiClient.updateMoodEntry(editingId, editMood, editNotes);
      if (res.success) {
        setMoodEntries(moodEntries.map(e => e._id === editingId ? res.data : e));
        setEditingId(null);
        setEditMood(3);
        setEditNotes('');
      }
    } catch (err) {
      console.error('Failed to update mood', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this mood entry?')) return;
    try {
      const res = await apiClient.deleteMoodEntry(id);
      if (res.success) {
        setMoodEntries(moodEntries.filter(e => e._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete mood', err);
    }
  };

  return (
    <MainLayout role="student">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">😊 Mood Tracker</h1>
          <p className="text-gray-600 text-sm mt-1">Track your daily mood and emotional well-being</p>
        </div>

        {/* Mood Entry Form */}
        <MoodEntry studentId={studentId} onMoodAdded={handleMoodAdded} />

        {/* Mood History */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">📅 Your Mood History</h2>

          {loading ? (
            <p className="text-gray-600 text-center py-8">Loading mood entries...</p>
          ) : moodEntries.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No mood entries yet. Start tracking today!</p>
          ) : (
            <div className="space-y-3">
              {moodEntries.map((entry) =>
                editingId === entry._id ? (
                  <div key={entry._id} className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-3">✏️ Edit Mood Entry</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Mood</label>
                        <div className="flex justify-between gap-2 mb-2">
                          {[1, 2, 3, 4, 5].map(m => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setEditMood(m)}
                              className={`flex-1 py-2 rounded-lg font-bold transition ${
                                editMood === m
                                  ? 'bg-blue-500 text-white scale-105'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {m === 1 ? '😢' : m === 2 ? '😕' : m === 3 ? '😐' : m === 4 ? '🙂' : '😄'}
                            </button>
                          ))}
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={editMood}
                          onChange={(e) => setEditMood(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-300 rounded-lg accent-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Notes</label>
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
                          rows="3"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex-1 px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                        >
                          ✅ Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 px-4 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition"
                        >
                          ✕ Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={entry._id} className="bg-white rounded-lg p-4 border-2 border-blue-200 shadow-md hover:shadow-lg transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <span className="text-4xl">
                          {entry.mood === 1 ? '😢' : entry.mood === 2 ? '😕' : entry.mood === 3 ? '😐' : entry.mood === 4 ? '🙂' : '😄'}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-lg text-gray-800">{moodLabels[entry.mood]}</p>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">{entry.date}</span>
                          </div>
                          {entry.notes && (
                            <p className="text-gray-700 mt-2 text-sm bg-gray-50 p-2 rounded border-l-4 border-blue-500">{entry.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry._id)}
                          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Statistics */}
          {moodEntries.length > 0 && (
            <div className="mt-6 pt-6 border-t-2 border-blue-300">
              <h3 className="font-bold text-blue-800 mb-4 text-lg">📊 Your Mood Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map(m => {
                  const count = moodEntries.filter(e => e.mood === m).length;
                  const percentage = ((count / moodEntries.length) * 100).toFixed(0);
                  return (
                    <div key={m} className="bg-white rounded-lg p-4 border-2 border-blue-200 text-center shadow-md">
                      <p className="text-3xl mb-2">{m === 1 ? '😢' : m === 2 ? '😕' : m === 3 ? '😐' : m === 4 ? '🙂' : '😄'}</p>
                      <p className="text-sm text-gray-700 font-semibold">{count} times</p>
                      <p className="text-xs text-gray-500">{percentage}%</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MoodTracker;
