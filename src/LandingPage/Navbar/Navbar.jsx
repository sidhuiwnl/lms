import { useState } from "react";
import { Links } from "../../utils/Links";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#001040] w-full h-[100px]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-10 md:px-16 lg:px-20 py-4">
        <div className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[296px] h-[32px] sm:h-[40px] md:h-[48px] lg:h-[52px]">
          <img
            src="/image 66.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden sm:flex gap-6">
         {Links.map((link) => (
          <Link
            key={link.id}
            to={link.link}
            className="lnknav text-[14px] sm:text-[16px] font-normal duration-300 montserrat-main"
            {...(link.name === "My Spine Coach"
              ? {  rel: "noopener noreferrer" }
              : {})}
          >
            {link.name}
          </Link>
  ))}

        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden flex flex-col items-center gap-4 pb-4"
        >
          {Links.map((link) => (
  <Link
    key={link.id}
    to={link.link}
    className="lnknav text-[14px] font-normal montserrat-main"
    onClick={() => setIsOpen(false)}
    {...(link.name === "My Spine Coach"
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {})}
  >
    {link.name}
  </Link>
))}

        </div>
      )}
    </nav>
  );
}
