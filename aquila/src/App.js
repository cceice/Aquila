import React, { useState } from 'react';
import FrontPage from './components/FrontPage.js';
import ClientDashboard from './components/ClientDashboard.js';

function App() {
  const [currentView, setCurrentView] = useState('front'); // 'front' o 'dashboard'

  return (
    <div className="App">
      {currentView === 'front' ? (
        <FrontPage 
          onLoginSuccess={() => setCurrentView('dashboard')} 
        />
      ) : (
        <ClientDashboard 
          onLogout={() => setCurrentView('front')} 
        />
      )}
    </div>
  );
}

export default App;