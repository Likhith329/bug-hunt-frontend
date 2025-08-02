import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Lobby from "./pages/Lobby/Lobby";
import Header from "./Components/Header/Header";
import "./App.css";
import WaitingPage from "./pages/WaitingPage/WaitingPage";

function App() {
  const PrivateRoutes = () => {
    let token = localStorage.getItem('token')
    return token ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<Header />}>
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/waiting" element={<WaitingPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
