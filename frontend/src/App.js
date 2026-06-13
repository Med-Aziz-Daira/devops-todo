import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data.data);
    } catch {
      setError('Failed to fetch tasks');
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await axios.post(API_URL, { title });
      setTitle('');
      fetchTasks();
    } catch {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { completed: !completed });
      fetchTasks();
    } catch {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>DevOps Todo</h1>
        <p className="subtitle">MERN + GCP + GitHub Actions</p>
      </header>

      <form onSubmit={handleCreate} className="task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => handleToggle(task._id, task.completed)}>
              {task.completed ? '✅' : '⬜'} {task.title}
            </span>
            <button onClick={() => handleDelete(task._id)} className="delete-btn">
              🗑
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p className="empty">No tasks yet. Add one above!</p>}
    </div>
  );
}

export default App;
