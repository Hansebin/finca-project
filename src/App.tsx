import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";

const App: React.FC = () => {
  return (
    <>
      <div className="bg-bg-color min-w-full min-h-screen">
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StartPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/join" element={<JoinPage />}></Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </div>
    </>
  );
};

export default App;
