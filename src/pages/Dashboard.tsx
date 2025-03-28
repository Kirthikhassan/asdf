import React, { useState } from 'react';
import { PlusCircle, Activity, Calendar, TrendingUp, X } from 'lucide-react';

interface Workout {
  id: number;
  date: string;
  type: string;
  duration: number;
  calories: number;
}

const Dashboard = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: 1,
      date: '2024-03-10',
      type: 'Running',
      duration: 30,
      calories: 300
    },
    {
      id: 2,
      date: '2024-03-09',
      type: 'Weight Training',
      duration: 45,
      calories: 200
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    duration: 0,
    calories: 0
  });

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const workout: Workout = {
      id: workouts.length + 1,
      ...newWorkout
    };
    setWorkouts([workout, ...workouts]);
    setIsModalOpen(false);
    setNewWorkout({
      date: new Date().toISOString().split('T')[0],
      type: '',
      duration: 0,
      calories: 0
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 text-indigo-600 mb-2">
            <Activity className="h-6 w-6" />
            <h3 className="font-semibold">Total Workouts</h3>
          </div>
          <p className="text-3xl font-bold">{workouts.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 text-indigo-600 mb-2">
            <Calendar className="h-6 w-6" />
            <h3 className="font-semibold">This Week</h3>
          </div>
          <p className="text-3xl font-bold">5 workouts</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 text-indigo-600 mb-2">
            <TrendingUp className="h-6 w-6" />
            <h3 className="font-semibold">Total Calories</h3>
          </div>
          <p className="text-3xl font-bold">
            {workouts.reduce((acc, curr) => acc + curr.calories, 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Workouts</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Workout</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Date</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Duration (min)</th>
                <th className="pb-3">Calories</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id} className="border-b">
                  <td className="py-3">{workout.date}</td>
                  <td className="py-3">{workout.type}</td>
                  <td className="py-3">{workout.duration}</td>
                  <td className="py-3">{workout.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Workout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Workout</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddWorkout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newWorkout.date}
                  onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Workout Type</label>
                <select
                  value={newWorkout.type}
                  onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a type</option>
                  <option value="Running">Running</option>
                  <option value="Weight Training">Weight Training</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Yoga">Yoga</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={newWorkout.duration}
                  onChange={(e) => setNewWorkout({ ...newWorkout, duration: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Calories Burned</label>
                <input
                  type="number"
                  min="0"
                  value={newWorkout.calories}
                  onChange={(e) => setNewWorkout({ ...newWorkout, calories: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;