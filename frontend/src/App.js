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

function App() {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
  });

  return (
    <UserReducerContext.Provider value={{user, setUser}}>
      <div className="App w-screen h-screen">
        <NavigationBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns/*" element={<CampaignManager />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserReducerContext.Provider>
  );
}

export default App;
