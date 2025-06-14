import { NavLink } from "react-router-dom";


import "./Drmenubar.css";

import loginimg from "../../../assets/profile1.png";
import Mainlogo from "../../../assets/image 39.png";

function Drmenubar() {
  return (
    <nav className="navbarcontenttext  py-4">
      <div className="container flex flex-row justify-between items-center">
        {/* Logo */}
        <NavLink to="/myspinecoach">
          <img src={Mainlogo} alt="Main Logo" className="logoken ms-lg-5" />
        </NavLink>

        {/* Toggle (for small screens) */}
        {/* Implement a button here if you want a collapsible menu in small screens */}
        {/* <button aria-controls="navbar-nav">Menu</button> */}

        {/* Menu Links */}
        <ul className="d-lg-none me-auto">
          <li>
            <NavLink to="">Home</NavLink>
          </li>
          <li>
            <NavLink to="/llmlogin">Login</NavLink>
          </li>
        </ul>

        {/* Large screen links and search */}
        <div className=" d-none d-lg-flex align-items-center ">
          <div className="d-lg-flex flex-grow-1">
            <NavLink to="/" className="navpart px-3">
              Home
            </NavLink>
          </div>

          <NavLink to="/llmlogin" className="ms-4">
            <img src={loginimg} alt="Login" className="imglogin" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Drmenubar;
