import React, { useState, useEffect } from "react";
import "./Drkenhome.css";
import { Link, useLocation } from "react-router-dom";
import Overview from "../Overview/Overview";
import Lessons from "../Lessons/Lessons";

import icon1 from "../../../assets/tabler_book1.png";
import icon3 from "../../../assets/gravity-ui_person.png";
import icon2 from "../../../assets/mingcute_time-line.png";
import frontgif from "../../../assets/looping3.gif";
import axios from "axios";
import Instructors from "../Instructors/Instructors";

function Drkenhome() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [count, setCount] = useState({
    moduleCount: "",
    enrolleCount: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/moduleandenrollcount`)
      .then((res) => {
        console.log(res.data);
        setCount({
          moduleCount: res.data.moduleCount,
          enrolleCount: res.data.enrollmentCount,
        });
      });
  }, []);

  useEffect(() => {
    if (location.pathname.includes("mycourses")) {
      setActiveTab("lessons");
    } else if (location.pathname.includes("instructor")) {
      setActiveTab("Instructor");
    } else {
      setActiveTab("overview");
    }
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "Instructor":
        return <Instructors />;
      case "lessons":
        return <Lessons />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="container mt-10">
      <div
        className={
          activeTab === "lessons" ? "video-wrapper my-2" : "video-wrapper1 my-2"
        } >
        {activeTab === "lessons" ? (
          <iframe
            src="https://player.vimeo.com/video/984701898?autoplay=1&muted=1" // Replace with the actual video URL
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Lessons Video"
          />
        ) : (
          <img src={frontgif} alt="Loading animation" className="rounded-5" />
        )}
      </div>
      <div className="m-5">
        <h5 className="my-5 text-center" style={{ fontWeight: "600" }}>
          Introduction of My Spine Coach
        </h5>
      </div>
      <div className="row storypart mx-1">
        <div className="d-flex justify-content-between rounded-xl border align-items-center lessontext px-4 flex-wrap w-100">
          <div className="text-center py-3 ">
            <p className="iconpara fw-bold flex items-center">
              <img
                src={icon1}
                className="mx-2"
                alt="Lessons"
                style={{ height: "24px" }}
              />
              {count.moduleCount} Lessons
            </p>
          </div>
          <div className="text-center">
            <p className="iconpara fw-bold pt-2  flex items-center">
              <img
                src={icon2}
                className="mx-2"
                alt="Hours"
                style={{ height: "24px" }}
              />
              15 Hours
            </p>
          </div>
          <div className="text-center">
            <p className="iconpara fw-bold pt-2  flex items-center">
              <img
                src={icon3}
                className="mx-2"
                alt="Enrolled"
                style={{ height: "24px" }}
              />
              {count.enrolleCount} Enrolled
            </p>
          </div>
        </div>

        <div className="row my-3 py-3 ">
              <div className="d-flex justify-content-between text-center flex-wrap px-5 py-3">
              <div className="col-auto">
                <Link
                  to="#"
                  onClick={() => setActiveTab("overview")}
                  className={activeTab === "overview" ? "active-link" : "font-bold "}
                  style={{ textDecoration: "none", color : "#001040" }}
                >
                  Overview
                </Link>
              </div>

              <div className="col-auto">
                <Link
                  to="#"
                  onClick={() => setActiveTab("Instructor")}
                  className={activeTab === "Instructor" ? "active-link" : "font-bold"}
                  style={{ textDecoration: "none" , color : "#001040" }}
                >
                  About Instructor
                </Link>
              </div>

              <div className="col-auto">
                <Link
                  to="#"
                  onClick={() => setActiveTab("lessons")}
                  className={activeTab === "lessons" ? "active-link" : "font-bold"}
                  style={{ textDecoration: "none", color : "#001040" }}
                >
                  Lessons
                </Link>
              </div>
            </div>
            </div>
            <hr />
            <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Drkenhome;
