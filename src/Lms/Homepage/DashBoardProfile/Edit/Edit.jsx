import React, { useEffect } from "react";
import "../UserProfile/UserProfile.css";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Indiviualdashboardmain } from "../Profile/Profile";
import axios from "axios";
import EditProfile from "./EditProfile";

export function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}auth/protected`,
          { withCredentials: true }
        );
        console.log("Token is valid:", response.data);
      } catch (error) {
        console.error("Token verification error:", error);
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/llmlogin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
      <nav
        className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
        id="navbarVertical"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler ms-n2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapse"
            aria-controls="sidebarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
            <h3 className="brand-title">My Spine Coach</h3>
          </a>
          <div className="collapse navbar-collapse" id="sidebarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-dark" to={`/user/${id}/profile`}>
                  <i className="bi bi-house"></i> <span className="text-black">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to={`/user/${id}/message`}>
                  <i className="bi bi-chat"></i><span className="text-black">Messages</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to={`/user/${id}/payment`}>
                  <i className="bi bi-chat"></i><span className="text-black">Payment</span>
                </Link>
              </li>
            </ul>
            <hr className="navbar-divider my-5 opacity-20" />
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-dark"
                  to="#"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-left"></i> <span className="text-black">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <EditProfile />
    </div>
  );
}
