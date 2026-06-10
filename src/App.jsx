import React, { useState } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState('');
  const [logLevel, setLogLevel] = useState('info');

  const addLog = () => {
    if (message.trim()) {
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        level: logLevel,
        message: message.trim(),
      };
      setLogs([newLog, ...logs]);
      setMessage('');
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addLog();
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      info: '#3498db',
      warning: '#f39c12',
      error: '#e74c3c',
      success: '#27ae60',
    };
    return colors[level] || '#95a5a6';
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>IronLog</h1>
        <p>A simple logging application</p>
      </header>

      <div className="input-section">
        <div className="input-group">
          <select
            value={logLevel}
            onChange={(e) => setLogLevel(e.target.value)}
            className="log-level-select"
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="success">Success</option>
          </select>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter log message..."
            className="log-input"
          />
          <button onClick={addLog} className="add-btn">
            Add Log
          </button>
        </div>
        {logs.length > 0 && (
          <button onClick={clearLogs} className="clear-btn">
            Clear All
          </button>
        )}
      </div>

      <div className="logs-section">
        <h2>Logs ({logs.length})</h2>
        <div className="logs-container">
          {logs.length === 0 ? (
            <div className="empty-state">No logs yet. Add your first log!</div>
          ) : (
            <ul className="logs-list">
              {logs.map((log) => (
                <li key={log.id} className="log-item">
                  <span
                    className="log-level"
                    style={{ backgroundColor: getLevelColor(log.level) }}
                  >
                    {log.level.toUpperCase()}
                  </span>
                  <span className="log-timestamp">{log.timestamp}</span>
                  <span className="log-message">{log.message}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
