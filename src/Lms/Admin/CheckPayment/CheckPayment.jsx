import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CheckPayment() {
  const { quantity } = useParams();
  const amt = quantity * 20;
  const [amount, setAmount] = useState(amt);
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const [chequeNumberError, setChequeNumberError] = useState("");

  const decodedId = atob(id)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}admin/bussuserdetails/${decodedId}`)
      .then((res) => res.json())
      .then((respon) => {
        console.log(respon);
        setEmail(respon[0].spoc_email_id);
      });
  }, [id]);

  function handlecheckdetails(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const checkno = document.getElementById("checkno").value;
    const quantity = document.getElementById("quantity").value;
    const amount = document.getElementById("amount").value;

    // Cheque number regex pattern: between 6 to 9 digits
    const chequePattern = /^\d{6,15}$/;

    // Validate cheque number
    if (!chequePattern.test(checkno)) {
      setChequeNumberError("Cheque number must be between 6 and 9 digits.");
      return; // Do not proceed with form submission
    } else {
      setChequeNumberError(""); // Clear error if validation passes
    }

    if (checkno === "") {
      alert("Kindly fill the Check number");
      return; // Do not proceed if cheque number is empty
    }

    const key = {
      email: email,
      checkno: checkno,
      quantity: quantity,
      amount: amount,
    };

    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}admin/checktransation/${decodedId}`, key)
      .then((res) => {
        if (res.data.status === "inserted") {
          alert("Thank you! Your license will update after Admin Approval.");
          window.location.assign(`/admindashboard/${id}/purlicense`);
        } else {
          alert("Sorry, please refill the details.");
          window.location.reload();
        }
      });
  }

  return (
     <div className="neft-container">
    <div className="neftpart ">
    <div className="container ">
      <div className="row d-flex flex-column justify-content-center align-items-center ">
        <h3 className="m-0 m-md-3 text-center">Transactional Details</h3>
        <div className="col-sm-12 login-form card p-3">
          <form onSubmit={handlecheckdetails}>
            <div className="form-group">
              <label className="form-control-label text-start">Email Id</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                value={email}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-control-label text-start">Cheque No</label>
              <input
                type="text"
                className="form-control"
                name="checkno"
                id="checkno"
                required
              />
              {chequeNumberError && (
                <p style={{ color: "red" ,fontSize:"12px"}}>{chequeNumberError}</p>
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
                readOnly
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
                readOnly
              />
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
