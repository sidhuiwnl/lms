import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faTimes,
  faPowerOff,
  faFileLines,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const sidebarVariants = {
  open: { width: "220px" },
  closed: { width: "0px" },
};

const linkVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -10, },
};

function Adminsidebar({ isOpen, toggleSidebar }) {
  const { id } = useParams();
  const navigate = useNavigate();

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
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Toggle icon - positioned independently with higher z-index */}
      <div
        className="fixed top-2.5 left-2.5 p-3 cursor-pointer bg-transparent rounded z-[60]"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          size="lg"
          style={{
            color : isOpen ? "white" : "black"
          }}
          
        />
      </div>

      {/* Sidebar content */}
      <motion.div
        className="fixed h-full bg-[#001040] shadow-lg z-50 overflow-hidden"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Links */}
        <motion.ul
          className="mt-16 pt-2"
          initial={isOpen ? "open" : "closed"}
          animate={isOpen ? "open" : "closed"}
          variants={linkVariants}
          transition={{ duration: 0.2 }}
        >
          <li>
            <Link
              to={`/admindashboard/${id}/dashboard`}
              className="flex items-center  text-white  transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faHome} className="min-w-[20px] text-center mr-3" />
              <span className={isOpen ? "inline-block whitespace-nowrap" : "hidden"}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/admindashboard/${id}/purelicense`}
              className="flex items-center  text-white  transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faIdBadge} className="min-w-[20px] text-center mr-3" />
              <span className={isOpen ? "inline-block whitespace-nowrap" : "hidden"}>Purchase License</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/admindashboard/${id}/courselist`}
              className="flex items-center  text-white  transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faFileLines} className="min-w-[20px] text-center mr-3" />
              <span className={isOpen ? "inline-block whitespace-nowrap" : "hidden"}>Course</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center  text-white  transition-colors duration-200 w-full text-left"
            >
              <FontAwesomeIcon icon={faPowerOff} className="min-w-[20px] text-center mr-3" />
              <span className={isOpen ? "inline-block whitespace-nowrap" : "hidden"}>Logout</span>
            </button>
          </li>
        </motion.ul>
      </motion.div>
    </>
  );
}

export default Adminsidebar;