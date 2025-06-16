import { NavLink } from "react-router-dom";
import loginimg from "../../../assets/profile1.png";
import Mainlogo from "../../../assets/image 39.png";

function Drmenubar() {
  return (
    <nav className="navbarcontenttext h-20 py-4">
      <div className="flex flex-row justify-between items-center">
        
        <NavLink to="/myspinecoach">
          <img src={Mainlogo} alt="Main Logo" className="logoken ms-lg-5" />
        </NavLink>
        
        <div className="flex items-center lg:mr-10 ">
          <div className="d-lg-flex flex-grow-1">
            <NavLink to="/" className="navpart px-3">
              Home
            </NavLink>
          </div>

          <NavLink to="/llmlogin" className="ms-4">
            <img src={loginimg} alt="Login" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Drmenubar;
