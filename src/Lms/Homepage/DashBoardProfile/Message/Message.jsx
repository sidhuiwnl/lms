import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MessageHistory  from "./MessageHistory";
import axios from "axios";

export function Message() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}auth/protected`,
          { withCredentials: true }
        );
        console.log("Token is valid.", response.data);
      } catch (error) {
        console.error("Token verification error.", error);
        navigate("/llmlogin");
      }
    };
    verifyToken();
  }, [navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className=" text-gray-50 lg:w-60 border border-neutral-900 p-6">
        {/* Logo */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xxl font-bold">My Spine Coach</h3>
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-md border border-gray-50">
            <span className="text-black">☰</span>
          </button>
        </div>

        {/* Menu links */}
        <ul
          className={`flex-col gap-4 ${
            isOpen ? "flex" : "hidden"
          } lg:flex`}
        >
          <li>
            <Link
              to={`/user/${id}/profile`}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-black font-bold transition-colors"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to={`/user/${id}/message`}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-black font-bold transition-colors"
            >
              Messages
            </Link>
          </li>

          <li>
            <Link
              to={`/user/${id}/payment`}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-black font-bold transition-colors"
            >
              Payment
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-black font-bold transition-colors w-full text-left">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="flex-grow p-6">
        <MessageHistory />
      </div>
    </div>
  );
}

export default Message;

