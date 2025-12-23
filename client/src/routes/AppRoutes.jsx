import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Notes from "../pages/Notes";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
      </Route>
    </Routes>
  );
}
