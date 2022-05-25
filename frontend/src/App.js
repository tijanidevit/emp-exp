import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages";
import Layout from "./components/layout/Layout";
import EmployeesPage from "./pages/EmployeesPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/employees" element={<EmployeesPage />} />
            <Route />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
