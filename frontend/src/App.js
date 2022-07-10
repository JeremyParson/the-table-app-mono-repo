import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CampaignManager from './Presentation/campaign/CampaignManager';


function App() {
  return (
    <div className="App w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/campaigns/*" element={<CampaignManager />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
