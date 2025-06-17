import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "../SuperAdminSidebar/SuperAdminSidebar";
import { motion } from "framer-motion";
import "./SuperAdminDashboard.css"

const SuperAdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const contentVariants = {
    open: {
      x: 200,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="dashboard-container">
      <SuperAdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <motion.div
        className="dashboard-content"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={contentVariants}
        style={{ transformOrigin: "left" }}
      >
        <Outlet  /> 
      </motion.div>
    </div>
  );
};

export default SuperAdminDashboard;