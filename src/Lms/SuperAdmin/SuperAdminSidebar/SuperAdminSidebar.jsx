import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faDashboard,
  faDriversLicense,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const sidebarVariants = {
  open: { width: "200px" },
  closed: { width: "0px" },
};

function SuperAdminSidebar({ isOpen, toggleSidebar }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}auth/protected`,
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Token verification error.", error);
        navigate("/llmlogin");
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
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/llmlogin");
    } catch (error) {
      console.error("Logout error.", error);
    }
  };

  return (
    <>
      {/* Toggle icon - positioned independently with higher z-index */}
      <div
        className="fixed top-2.5 left-2.5 p-3 text-black cursor-pointer bg-transparent rounded z-[60]"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          style={{ color: isOpen ? "white" : "black " }}
          size="lg"
        />
      </div>

      {/* Sidebar content */}
      <motion.div
        className="fixed h-full  bg-[#001040] shadow-lg z-50 overflow-hidden"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Links (only rendered when sidebar is open) */}
        {isOpen && (
          <div className="mt-16 pt-2">
            <Link
              to={`/superadmin/${id}/dashboard`}
              className="flex items-center p-3 text-gray-100 "
            >
              <FontAwesomeIcon icon={faDashboard} className="min-w-[20px] text-center mr-3" />
              <span>Dashboard</span>
            </Link>

            <Link
              to={`/superadmin/${id}/approve`}
              className="flex items-center p-3 text-gray-100 "
            >
              <FontAwesomeIcon icon={faDriversLicense} className="min-w-[20px] text-center mr-3" />
              <span>Approve</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center p-3 text-gray-100  w-full text-left"
            >
              <FontAwesomeIcon icon={faPowerOff} className="min-w-[20px] text-center mr-3" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default SuperAdminSidebar;