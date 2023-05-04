import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Landing from "./components/landing page/Landing.jsx";
import Login from "./components/login page/Login.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { data } = useSelector((state) => state?.LoginReducer);

  return (
    <>{!!data && !!data?.email ? <Outlet /> : <Navigate to={"/login"} />}</>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
