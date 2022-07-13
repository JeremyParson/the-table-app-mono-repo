import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Hooks
import { useState } from "react";

// Context
import { UserReducerContext } from "./Presentation/context/UserReducerContext";

// Pages
import CampaignManager from "./Presentation/view/campaign/CampaignManager";
import Home from "./Presentation/view/components/Home";
import NavigationBar from "./Presentation/view/components/NavigationBar";
import Registration from "./Presentation/view/user/Registration"
import Dashboard from "./Presentation/view/user/Dashboard"
import CreateCampaign from "./Presentation/view/campaign/CreateCampaign";
import CreateCharacter from "./Presentation/view/character/CreateCharacter"
import CampaignDetail from "./Presentation/view/campaign/CampaignDetail"
import Session from "./Presentation/view/campaign/Session"

function App() {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
  });

  return (
    <UserReducerContext.Provider value={{user, setUser}}>
      <div className="App w-screen h-screen overflow-x-hidden">
        <BrowserRouter>
        <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/campaigns/*" element={<CampaignManager />} />
            <Route path="/dashboard/new-campaign" element={<CreateCampaign />} />
            <Route path="/dashboard/new-character" element={<CreateCharacter />} />
            <Route path='campaign/:id' element={<CampaignDetail />} />
            <Route path='session/:id' element={<Session />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserReducerContext.Provider>
  );
}

export default App;
