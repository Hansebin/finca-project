import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";

const App: React.FC = () => {
  return (
    <>
      <div className="bg-bg-color min-w-full min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/join" element={<JoinPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
