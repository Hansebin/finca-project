import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";

const App: React.FC = () => {
  return (
    <>
      <div className="bg-bg-color min-w-full min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
