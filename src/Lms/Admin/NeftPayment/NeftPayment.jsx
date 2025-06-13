import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NeftPayment.css";


export default function NeftPayment() {
  const { quantity } = useParams();
  const amt = quantity * 20;
  const [amount, setAmount] = useState(amt);
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const [transactionError, setTransactionError] = useState("");
  const transactionPattern = /^[A-Za-z0-9]{6,20}$/;

  const decodedId = atob(id)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}admin/bussuserdetails/${decodedId}`)
      .then((res) => res.json())
      .then((respon) => {
        console.log(respon);
        setEmail(respon[0].spoc_email_id);
      });
  }, [id]);

  function handleneftdetails(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const transactionId = document.getElementById("transactionid").value;
    const quantity = document.getElementById("quantity").value;
    const amount = document.getElementById("amount").value;

    // Validate transaction ID
    if (!transactionPattern.test(transactionId)) {
      setTransactionError("Enter a Valid Transaction ID .");
      return; // Prevent form submission
    } else {
      setTransactionError(""); // Clear error if validation passes
    }

    const key = {
      email,
      transactionid: transactionId,
      quantity,
      amount,
    };

    // Send request to server
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}admin/nefttransation/${decodedId}`, key)
      .then((res) => {
        if (res.data.status === "inserted") {
          alert("Thank you! Your license will update after Admin Approval");
          window.location.assign(`/admindashboard/${id}/purlicense`);
        } else {
          alert("Sorry, please refill the details");
          window.location.reload();
        }
      });
  }

  return (
     <div className="neft-container">
    <div className="neftpart">
    <div className="container">
      <div className="row d-flex flex-column justify-content-center align-items-center">
        <h3 className="m-0 m-md-3 text-center">Transactional Details</h3>
        <div className="col-sm-12 login-form card p-3">
          <form onSubmit={handleneftdetails}>
            <div className="form-group">
              <label className="form-control-label text-start">Email Id</label>
              <input
                type="text"
                className="w-100"
                name="email"
                id="email"
                value={email}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-control-label text-start">Transaction Id</label>
              <input
                type="text"
                className="form-control"
                name="transactionid"
                id="transactionid"
                required
              />
              {transactionError && (
                <p style={{ color: "red",fontSize:"12px" }}>{transactionError}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-control-label text-start">Quantity</label>
              <input
                type="text"
                className="form-control"
                name="quantity"
                id="quantity"
                value={quantity}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-control-label text-start">Amount</label>
              <input
                type="text"
                className="form-control"
                name="amount"
                id="amount"
                value={amount}
                readOnly/>
            </div>

            <button type="submit" className="btn neftbtn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
