import React, { useState, useEffect } from "react";
import "./MessageHistory.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MessageHistory() {
  const [view, setView] = useState("compose");
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleViewChange = (viewType) => {
    setView(viewType);
    if (viewType === "history") {
      fetchMessageHistory();
    }
  };

  const handleRecipientChange = (type) => {
    setRecipients((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (recipients.length === 0 || !subject || !message) {
      setResponseMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    const res = {
      email: recipients.join(","), // Join selected recipients
      subject,
      message,
      user_id: id,
    };
    console.log(res);

    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}user/composemessage`, {
        email: recipients.join(","), // Join selected recipients
        subject,
        message,
        user_id: id,
      })
      .then((res) => {
        setLoading(false); // Stop loading spinner

        if (
          res.data.message ===
          "Message sent and stored successfully to all recipients!"
        ) {
          toast.success("Message sent successfully to recipient!");
          setRecipients([]); // Clear recipients
          setSubject("");
          setMessage("");
        } else {
          alert(res.data.message); // Alert if message fails
        }
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false); // Stop loading spinner
      });
  };

  const fetchMessageHistory = async () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}user/getallmsg/` + id)
      .then((res) => {
        console.log(res);
        setMessageHistory(res.data.msg);
      })
      .catch((err) => {
        console.error("Error fetching message history:", err);
      });
  };

  return (
    <div>
      <ToastContainer />
      <nav className="message-nav flex gap-3">
        <button
          className={`nav-btn flex gap-2 ${view === "compose" ? "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl" : "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl"}`}
          onClick={() => handleViewChange("compose")}
          
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>          Compose Message
        </button>
        <button
          className={`nav-btn flex gap-2 ${view === "history" ? "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl" : "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl"}`}
          onClick={() => handleViewChange("history")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-clock-icon lucide-file-clock"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="8" cy="16" r="6"/><path d="M9.5 17.5 8 16.25V14"/></svg>
          Message History
        </button>
      </nav>

      <div>
        {view === "compose" && (
          <div className="compose-form">
            <div className="form-group">
              <label className="text-start">Select Recipient</label>
              <div className="recipient-buttons">
                <button
                  className={`recipient-btn ${
                    recipients.includes("1") ? "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl" : "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl"
                  }`}
                  onClick={() => handleRecipientChange("1")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-headset-icon lucide-headset"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg>
                  <i className="fas fa-headset"></i> Support
                  {recipients.includes("1") && (
                    <i className="fas fa-check tick-icon"></i>
                  )}
                </button>

                <button
                  className={`recipient-btn ${
                    recipients.includes("2") ? "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl" : "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl"
                  }`}
                  onClick={() => handleRecipientChange("2")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-pen-icon lucide-user-round-pen"><path d="M2 21a8 8 0 0 1 10.821-7.487"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="8" r="5"/></svg>
                  <i className="fas fa-chalkboard-teacher"></i> Instructor
                  {recipients.includes("2") && (
                    <i className="fas fa-check tick-icon"></i>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject-input" className="text-start">
                Subject
              </label>
              <input
                id="subject-input"
                type="text"
                className="form-control"
                placeholder="Enter subject"
                value={subject}
                onChange={handleSubjectChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message-text" className="text-start">
                Your Message
              </label>
              <textarea
                id="message-text"
                className="form-control message-textarea"
                placeholder="Write your message here..."
                value={message}
                onChange={handleMessageChange}
              ></textarea>
            </div>
            <button
              className="submit-btn bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </button>
            {responseMessage && (
              <p className="response-msg">{responseMessage}</p>
            )}
          </div>
        )}

        {view === "history" && (
          <div className="history-table">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Sender Name</th>
                  <th>Subject</th>
                  <th>Receiver Email</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {messageHistory.length > 0 ? (
                  messageHistory.map((msg, index) => (
                    <tr key={msg.id}>
                      <td>{index + 1}</td>
                      <td>{msg.sender_name}</td>
                      <td>{msg.subject}</td>
                      <td>{msg.receiver_email}</td>
                      <td>{new Date(msg.timestamp).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No messages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageHistory;
