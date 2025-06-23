import { NavLink } from "react-router-dom";
import loginimg from "../../../assets/profile1.png";
import Mainlogo from "../../../assets/image 39.png";

function Drmenubar() {
  return (
    <nav className="navbarcontenttext h-20 py-4 sticky top-0 z-50">
      <div className="flex flex-row justify-between items-center">
        
        <NavLink to="/myspinecoach">
          <img src={Mainlogo} alt="Main Logo" className="logoken ms-lg-5" />
        </NavLink>
        
        <div className="flex items-center lg:mr-10 ">
          
          <NavLink to="/lmslogin" className="ms-4">
            <img src={loginimg} alt="Login" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Drmenubar;
