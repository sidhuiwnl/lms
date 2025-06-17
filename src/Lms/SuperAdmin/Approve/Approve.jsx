import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Approve.css";
import { Link } from "react-router-dom";

export function Approve() {
  const [checktransation, setChecktransation] = useState([]);
  const [checkapproved, setCheckapproved] = useState([]);
  const [nefttransation, setnefttransation] = useState([]);
  const [neftapproved, setneftapproved] = useState([]);
  var id = "6c7b260c-6025-4899-939a-b72cf49cb317";
  const [activeTable, setActiveTable] = useState(1);
  const [activeTable2, setActiveTable2] = useState(1);
  const [transationid, setTransationid] = useState("");
  const changeTable = (tableNumber) => {
    setActiveTable(tableNumber);
  };
  const changeTable1 = (tableNumber) => {
    setActiveTable2(tableNumber);
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/getcheck`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChecktransation(data);
      });

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/checkapproved`)
      .then((res) => res.json())
      .then((data) => setCheckapproved(data));

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/getneft`)
      .then((res) => res.json())
      .then((data) => setnefttransation(data));

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/neftapproved`)
      .then((res) => res.json())
      .then((data) => setneftapproved(data));
  }, []);

  function handleupdate(event) {
    event.preventDefault();
    var transationid = document.getElementById("transationid").value;
    var email = document.getElementById("email").innerText;
    var id = document.getElementById("id").innerText;
    var quantity = document.getElementById("quantity").innerText;
    var amount = document.getElementById("amount").innerText;
    var key = {
      transationid: transationid,
      id: id,
      email: email,
      quantity: quantity,
      amount: amount,
    };
    console.log(key);

    if (transationid === "") {
      alert("plz fill the transation id");
    } else {
      axios
        .put(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/checkupdate`, key)
        .then((res) => {
          if (res.data.status === "updated") {
            alert("Approved");
            window.location.reload();
          }
        });
    }
  }
  function handleupdateneft(event) {
    event.preventDefault();
    var transationid = document.getElementById("nefttransationalid").innerText;
    var email = document.getElementById("neftemail").innerText;
    var id = document.getElementById("neftid").innerText;
    var quantity = document.getElementById("neftquantity").innerText;
    var amount = document.getElementById("neftamount").innerText;
    var key = {
      transationid: transationid,
      id: id,
      email: email,
      quantity: quantity,
      amount: amount,
    };
    console.log(key);

    if (transationid === "") {
      alert("plz fill the transation id");
    } else {
      axios
        .put(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin/neftupdate`, key)
        .then((res) => {
          if (res.data.status === "updated") {
            alert("Approved");
            window.location.reload();
          }
        });
    }
  }

  return (
    <div className="container-fluid">

       <div className="row py-15">
                      <div className="col-sm-10  mb-4 mb-sm-0">
                        <h1 className="h2 mb-0 ls-tight">
                          Hi, <span style={{ color: "#DC3545" }}> Dr.Ken</span>
                        </h1>
                      </div>
      
                      <div className="col-sm-2  mb-4 mb-sm-0">
                        <Link to="/business_register" className="subbtn1 rounded-2 my-2 text-decoration-none">Register</Link>                  
                      </div>
                    </div>
      <div className="row">
      <div className="rounded-2 p-4 shadow border-0 mb-5 w-100">
        <div className="d-flex justify-content-between my-3">
          <h5 className="mb-0 pointer">Cheque Transaction</h5>
          {activeTable === 1 ? (
           
            <button
  className="flex items-center px-4 py-2 mr-2 rounded-md bg-green-500 text-gray-50 font-semibold hover:bg-green-600 transition ease-in-out duration-300"
 
 onClick={() => changeTable(2)}
>
  Approved
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="ml-2"
  >
    <path fill="currentColor" d="M10.95 15.55L16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1l-1.425 1.425zM12 22q-3.475-.875-5.737-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22" />
  </svg>
</button>

          ) : (
            <h5
              className="mb-0 pointer btn btn-primary"
              onClick={() => changeTable(1)}
            >
              Waiting for Approval
            </h5>
          )}
        </div>
        <div className="table-responsive">
          <table className="w-100 table table-hover table-nowrap">
            <thead className="text-light">
              <tr className="tw">
                <th className="text-light">Id</th>
                <th className="text-light">email</th>
                <th className="text-light">Cheque Number</th>
                <th className="text-light">Transaction Id</th>
                <th className="text-light">quantity</th>
                <th className="text-light">Amount</th>
                <th className="text-light">Action</th>
              </tr>
            </thead>
            {activeTable === 1 && (
              <tbody>
                {checktransation.map((value, index) => (
                  <tr className="bg-white">
                    <td id="id">
                      {/* <img alt="..." src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" className="avatar avatar-sm rounded-circle me-2"/> */}
                      <a className="text-heading font-bold text-decoration-none" href="#">
                        {value.id}
                      </a>
                    </td>
                    <td id="email">{value.email}</td>
                    <td>{value.checkno}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter the Transation Id"
                        name="transationid"
                        id="transationid"
                      />
                    </td>
                    <td id="quantity">{value.quantity}</td>
                    <td id="amount">{value.amount}</td>
                    <td>
                      <svg xmlns="http://www.w3.org/2000/svg" 
                        onClick={handleupdate} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            {activeTable === 2 && (
              <tbody>
                {checkapproved.map((value, index) => (
                  <tr className="text-white">
                    <td>
                      <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        className="avatar avatar-sm rounded-circle me-2"
                      />
                      <a className="text-heading font-semibold" href="#">
                        {value.id}
                      </a>
                    </td>
                    <td>{value.email}</td>
                    <td>{value.checkno}</td>
                    <td>{value.transaction_id}</td>
                    <td id="quantity">{value.quantity}</td>
                    <td id="amount">{value.amount}</td>
                    <td>
                      <p className="text-success">Approved</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      
      </div>

      <div className="p-4 shadow border-0 mb-7">
        <div className="card-header d-flex justify-content-between my-3">
          <h5 className="mb-0 pointer">NEFT Transaction</h5>
          {activeTable2 === 1 ? (
            <button
             className="flex items-center px-4 py-2 mr-2 rounded-md bg-green-500 text-gray-50 font-semibold hover:bg-green-600 transition ease-in-out duration-300"
 
              onClick={() => changeTable1(2)}
            >
              Approved<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="ml-2"
  >
    <path fill="currentColor" d="M10.95 15.55L16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1l-1.425 1.425zM12 22q-3.475-.875-5.737-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22" />
  </svg>
            </button>
          ) : (
            <h5
              className="mb-0 pointer btn btn-primary"
              onClick={() => changeTable1(1)}
            >
              Waiting for Approval
            </h5>
          )}
        </div>
        <div className="table-responsive">
          <table className="w-100  table table-hover table-nowrap">
            <thead className="text-light">
              <tr className="text-white" >
                <th className="text-light">Id</th>
                <th className="text-light">email</th>
                <th className="text-light">Transaction Id</th>
                <th className="text-light">quantity</th>
                <th className="text-light">Amount</th>
                <th className="text-light">Action</th>
              </tr>
            </thead>
            {activeTable2 === 1 && (
              <tbody>
                {nefttransation.map((value, index) => (
                  <tr className="bg-white">
                    <td id="neftid">                                 
                      {/* <img alt="..." src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" className="avatar avatar-sm rounded-circle me-2"/> */}
                      <a className="text-heading font-bold text-decoration-none" href="#">
                        {value.id}
                      </a>
                    </td>
                    <td id="neftemail">{value.email}</td>
                    <td id="nefttransationalid">{value.transaction_id}</td>
                    <td id="neftquantity">{value.quantity}</td>
                    <td id="neftamount">{value.amount}</td>
                    <td>
                       <svg xmlns="http://www.w3.org/2000/svg" 
                         onClick={handleupdateneft} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            {activeTable2 === 2 && (
              <tbody>
                {neftapproved.map((value, index) => (
                  <tr  className="text-white">
                    <td>
                      <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        className="avatar avatar-sm rounded-circle me-2"
                      />
                      <a className="text-heading font-semibold" href="#">
                        {value.id}
                      </a>
                    </td>
                    <td id="neftemail">{value.email}</td>
                    <td id="nefttransationalid">{value.transaction_id}</td>
                    <td id="neftquantity">{value.quantity}</td>
                    <td id="neftamount">{value.amount}</td>
                    <td>
                      <p className="text-success">Approved</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        </div>
      </div>
    </div>
  );
}



