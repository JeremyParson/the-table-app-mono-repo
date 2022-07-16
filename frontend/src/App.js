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
import Session from "./Presentation/view/campaign/session/Session"
import CharacterView from "./Presentation/view/character/CharacterView"
import EditCampaign from "./Presentation/view/campaign/EditCampaign"

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
            <Route path='campaign/:id/edit' element={<EditCampaign />} />
            <Route path='session/:id' element={<Session />} />
            <Route path='session/:id/new-character' element={<CreateCharacter />} />
            <Route path='character/:id' element={<CharacterView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserReducerContext.Provider>
  );
}

export default App;
