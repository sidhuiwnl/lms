import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useParams } from "react-router-dom";
import pattern from "patternomaly";
import ProgressBar from "@ramonak/react-progress-bar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons"; // You can replace with faEdit if needed
import profile from "../../../../assets/profile1.png"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


function capitalize(name) {
  if (!name) return ""; // Ensure the name exists
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
export function Indiviualdashboardmain() {
  const { id } = useParams();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    profile_image: "" ,
    completion_percentage: 0,
  });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [assessmentLogs, setAssessmentLogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({ title: "", date: "" });
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const decodedId = atob(id)

  const getWeekDays = (startDate) => {
    const startOfWeek = moment(startDate).startOf("week");
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push({
        day: startOfWeek.format("ddd"),
        date: startOfWeek.format("YYYY-MM-DD"),
      });
      startOfWeek.add(1, "day");
    }
    return daysOfWeek;
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}user/user/${decodedId}`)
      .then((res) => {
        const userData = res.data;
        setUser({
          first_name: userData.first_name.trim(),
          // last_name: userData.last_name.trim(),
          completion_percentage: parseFloat(userData.completion_percentage),
          profile_image: userData.profile_image?.trim() ? userData.profile_image : profile, // Use default image if profile_image is not provided
          role: userData.profession || "Student", // Default to "Student" if role is not provided
        });
      })
      .catch((err) => {
        console.log("Error fetching user data", err);
      });
  }, [id]);

 useEffect(() => {
  const weekDays = getWeekDays(selectedDate);
  axios
    .get(
      `${import.meta.env.VITE_REACT_APP_API_URL}user/userworkhour/${decodedId}?weekStart=${weekDays[0].date}&weekEnd=${weekDays[6].date}`
    )
    .then((res) => {
      const workData = res.data;
      setChartData({
        data: weekDays.map((day) => {
          const dayData = workData.find((item) => item.date === day.date);
          return {
            name: day.day,
            value: dayData ? dayData.hours : 0,
          };
        }),
      });
    })
    .catch((err) => {
      console.log("Error fetching work hours data", err);
    });
}, [id, selectedDate]);


  console.log(chartData);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}user/assessment-logs/${decodedId}`)
      .then((res) => {
        const logs = res.data.logs;
        setAssessmentLogs(logs);
        const eventsData = logs
          .map((log) => {
            const eventList = [];
            if (log.pre_assessment) {
              eventList.push({ title: log.pre_assessment, date: log.date });
            }
            if (log.post_assessment) {
              eventList.push({ title: log.post_assessment, date: log.date });
            }
            return eventList;
          })
          .flat();
        setEvents(eventsData);
      })
      .catch((err) => {
        console.log("Error fetching assessment logs", err);
      });
  }, [id]);

  const handleEventClick = (info) => {
    setSelectedEvent({ title: info.event.title, date: info.event.startStr });
    setModalOpen(true); // Open modal
  };

  return (
    <>
      <div className="h-screen flex-grow-1 overflow-y-auto">
       

        <header className="bg-surface-primary border pt-6 rounded-lg">
          <div className="container-fluid">
            <div className="mb-npx">
              <div className="row align-items-center">
                <div className="col-sm-6 col-lg-12 mb-md-4 mb-sm-0">
                  <h1 className="h2 mb-0 ls-tight">
                    Hi,{" "}
                    <span style={{ color: "#DC3545" }}>
                    {capitalize(user.first_name)}  {user.last_name}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="row g-4 m-3">
          <div className="col-sm-12 col-lg-6 " >
            <div className="bg-white shadow p-4 rounded-4">
              <div className="text-center mb-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="form-control custom-date-picker mx-auto" // Use custom class
                />
              </div>

            <div className="w-full p-4">
  
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#000" />
                  <YAxis stroke="#000" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#001040" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>


            </div>
          </div>

          <div className="col-sm-12 col-lg-5">
            <div
              className="card rounded-4 p-4 text-center position-relative"
              style={{ height: "350px" }}
            >
              {/* Settings/Edit Icon */}
              <Link
                to={`/user/${id}/editprofile`} // Replace with the desired route
                className="position-absolute top-0 end-0 p-2"
                style={{ fontSize: "20px", color: "#DC3545" }}
              >
                <FontAwesomeIcon icon={faCog} />
              </Link>

              <div className="d-flex align-items-center justify-content-center mb-3">
                <img
                  src={user.profile_image ? user.profile_image : profile}
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="mb-2 d-flex flex-column align-items-center justify-content-center">
                <h5 className="mb-0">
                 {capitalize (user.first_name)} {user.last_name}
                </h5>
                <p className="mb-1">{user.role}</p>
              </div>
              <p className="mb-0">Course Completion</p>
              <ProgressBar
                completed={user.completion_percentage}
                bgColor="#ffa200"
                
              />
            </div>
          </div>

      <div className="col-sm-12 col-lg-12">
          <div className="card shadow rounded-4 p-4 text-dark text-decoration-none">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick}
              dayHeaderFormat={{ weekday: "short" }} 
              headerToolbar={{
                left: "prev,next", // Only includes navigation buttons
                right: "title",   // Displays the current title (e.g., November 2024)
                
              }}
              windowResize={(arg) => {
                if (window.innerWidth <= 768) {
                  arg.view.calendar.setOption("dayHeaderFormat", { weekday: "narrow" }); // Narrow format for small devices
                } else {
                  arg.view.calendar.setOption("dayHeaderFormat", { weekday: "short" }); // Short format for larger devices
                }
              }}
            />
          </div>
    </div>


        </div>
      </div>

      {/* Bootstrap Modal */}
      {modalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          id="eventModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="eventModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="eventModalLabel">
                  Event Details
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h4>{selectedEvent.title}</h4>
                <p> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zm7-6q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18"/></svg><b>{selectedEvent.date}</b></p>
              </div>
            </div>
          </div>
        </div>
      )}

     
    </>
  );
}
