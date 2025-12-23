import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container-fluid">
        <span className="navbar-brand">AI Notes</span>

        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink to="/" end className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/notes" className="nav-link">
              Notes
            </NavLink>
          </li>
        </ul>

        <div className="d-flex align-items-center gap-3">
          <span className="user-name">{user?.name}</span>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
