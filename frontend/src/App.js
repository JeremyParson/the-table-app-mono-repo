import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CampaignManager from './components/CampaignManager';
import CampaignViewer from './components/CampaignViewer'
// import InterfacePanel from './components/InterfacePanel';
// import TablePanel from './components/TablePanel';

function App() {
  return (
    <div className="App w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/campaigns/*" element={<CampaignManager />} />
          <Route path="/campaign/:id" element={<CampaignViewer />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
