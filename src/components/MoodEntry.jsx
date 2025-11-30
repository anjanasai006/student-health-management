import React, { useState } from 'react';
import apiClient from '../api/client';

const MoodEntry = ({ studentId, onMoodAdded }) => {
  const [mood, setMood] = useState(3);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const moodLabels = {
    1: '😢 Very Bad',
    2: '😕 Bad',
    3: '😐 Neutral',
    4: '🙂 Good',
    5: '😄 Excellent'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await apiClient.addMoodEntry(studentId, parseInt(mood), notes);
      if (res.success) {
        setMessage('✅ Mood entry saved!');
        setMood(3);
        setNotes('');
        if (onMoodAdded) onMoodAdded(res.data);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`❌ Error: ${res.error}`);
      }
    } catch (err) {
      setMessage(`❌ Failed to save mood: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Track Your Mood</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mood Selector with Visual Feedback */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">How are you feeling today?</label>
          <div className="flex justify-between items-center mb-3">
            {[1, 2, 3, 4, 5].map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  mood === m
                    ? 'bg-blue-500 text-white scale-110'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {m === 1 ? '😢' : m === 2 ? '😕' : m === 3 ? '😐' : m === 4 ? '🙂' : '😄'}
              </button>
            ))}
          </div>
          <p className="text-center text-lg font-semibold text-blue-600">{moodLabels[mood]}</p>
          <input
            type="range"
            min="1"
            max="5"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-3"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's on your mind? (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {loading ? 'Saving...' : 'Save Mood Entry'}
        </button>

        {/* Message */}
        {message && (
          <p className={`text-center font-semibold ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default MoodEntry;
