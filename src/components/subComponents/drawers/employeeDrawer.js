import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Picklist, PicklistOption, DatePicker } from "react-rainbow-components";
import { Select } from "react-rainbow-components";

import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function EmployeeDrawer({ open, onClose, addEmp, editEmp, id, edit, data }) {
  const [userType, setUserType] = useState("");
  const [position, setPosition] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [tablet, setTablet] = useState("");
  const [city, setCity] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [personalPhone, setPersonalPhone] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (edit) {
      console.log("here", data);
      setUserType(data.userType);
      setPosition(data.position);
      setVehicle(data.vehicle);
      setTablet(data.tablet);
      setCity(data.city);
      setFullname(data.fullname);
      setEmail(data.email);
      setPersonalPhone(data.personalPhone);
      setCompanyPhone(data.companyPhone);
      setUsername(data.username);
      setPassword(data.password);
    }
  }, []);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const dataObj = {
      userType,
      position,
      vehicle,
      tablet,
      city,
      fullname,
      email,
      personalPhone,
      companyPhone,
      username,
      password,
    };
    if (edit) {
      editEmp(dataObj, id);
    } else {
      addEmp(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setUserType("");
    setPosition("");
    setVehicle("");
    setTablet("");
    setCity("");
    setFullname("");
    setEmail("");
    setPersonalPhone("");
    setCompanyPhone("");
    setUsername("");
    setPassword("");
  };
  const allBoleanOpt = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <form onSubmit={handleAddEmployee}>
          <div className="input-wrap">
            <label>User Type</label>
            <input
              value={userType}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setUserType(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Position</label>
            <input
              value={position}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setPosition(e.target.value)}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label>Vehicle</label>
            <input
              value={vehicle}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setVehicle(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Tablet</label>
            <input
              value={tablet}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setTablet(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>City</label>
            <input
              value={city}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Name</label>
            <input
              value={fullname}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setFullname(e.target.value)}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label>Email</label>
            <input
              value={email}
              type="email"
              className={`${poppins.className} input-cus`}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Personal Phone</label>
            <input
              value={personalPhone}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setPersonalPhone(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Company Phone</label>
            <input
              value={companyPhone}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setCompanyPhone(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Username</label>
            <input
              value={username}
              required={true}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Password</label>
            <input
              value={password}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>

          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Employee" : "Add Employee"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default EmployeeDrawer;
