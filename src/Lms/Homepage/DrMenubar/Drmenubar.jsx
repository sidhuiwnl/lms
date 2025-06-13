
import { Navbar,Container,Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./Drmenubar.css";
import loginimg from "../../../assets/profile1.png";
import Mainlogo from "../../../assets/image 39.png";

function Drmenubar() {
  return (
    <Navbar expand="lg" className="navbarcontenttext py-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/myspinecoach">
          <img src={Mainlogo} alt="Main Logo" className="logoken ms-lg-5" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="d-lg-none me-auto">
           
            <Nav.Link
              as={NavLink}
              to="/"
            >
              Home
            </Nav.Link>
            
            <Nav.Link
              as={NavLink}
              to="/llmlogin"
              className="navpart px-3"
              
            >
              Login
            </Nav.Link>
          </Nav>
          {/* Separate section for large devices */}
          <Nav className="w-100 d-none d-lg-flex align-items-center justify-content-between">
            <div className="d-lg-flex flex-grow-1">
              <NavLink
                to="/"
                className="navpart px-3"
                
              >
                Home
              </NavLink>
            </div>
            <div className="search-bar d-none d-lg-block align-items-center p-2 bg-light">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="search"
                placeholder="Search"
                className="border-0 searchinput bg-light"
              />
            </div>
            <Nav.Link as={NavLink} to="/llmlogin" className="ms-4">
              <img src={loginimg} alt="Login" className="imglogin" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Drmenubar;
