import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CustomerPage from "./components/CustomerPage";
import AdminPage from "./components/AdminPage";
import BillsPage from "./components/BillsPage";

function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Customer</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/bills">Bills</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CustomerPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/bills" element={<BillsPage />} />
      </Routes>
    </div>
  );
}

export default App;
