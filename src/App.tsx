import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './App.css';

function App() {
  const [text, setText] = useState('# Willkommen bei TextScribe\n\nSchreibe hier deinen Text...');
  const [status, setStatus] = useState('Bereit');

  const handleSave = async () => {
    try {
      setStatus('Speichere...');
      await invoke('save_file', { content: text });
      setStatus('Gespeichert! ✅');
      setTimeout(() => setStatus('Bereit'), 2000);
    } catch (error) {
      setStatus(`Fehler: ${error}`);
    }
  };

  return (
    <div className="editor-container">
      <header className="editor-header">
        <h1>TextScribe 📝</h1>
        <div className="actions">
          <span className="status">{status}</span>
          <button onClick={handleSave} className="save-btn">Speichern</button>
        </div>
      </header>
      
      <div className="editor-body">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Beginne zu tippen..."
        />
        <div className="preview-pane">
          <pre>{text}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
