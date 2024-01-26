"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Employees from "../../components/employees";
import TimeTrack from "../../components/timeTrack";

import PicklistComp from "../../components/Picklists/picklist";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function Settings() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Employee");
  const [showPick, setShowPick] = useState(false);
  const [showEmp, setShowEmp] = useState(true);
  useEffect(() => {
    if (user.user == null || user.user.error) {
      router.push("/login");
    }
  }, [user]);
  const handleLinks = (e) => {
    setActiveLink(e.target.innerText);
  };
  return (
    <main className={`${poppins.className} home-dashboard`}>
      <section className="links-wrap">
        <p onClick={() => setShowEmp(!showEmp)}>
          Employees {showEmp ? "-" : "+"}
        </p>
        {showEmp ? (
          <ul
            onClick={handleLinks}
            className={`${poppins.className} inner-links`}
          >
            <li
              className={
                activeLink == "Employee"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Employee
            </li>
            <li
              className={
                activeLink == "Time Track"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Time Track
            </li>
          </ul>
        ) : null}
        <p onClick={() => setShowPick(!showPick)}>
          Picklist {showPick ? "-" : "+"}
        </p>
        {showPick ? (
          <ul onClick={handleLinks} className="inner-links">
            <li
              className={
                activeLink == "User Type"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              User Type
            </li>
            <li
              className={
                activeLink == "Position"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Position
            </li>
            <li
              className={
                activeLink == "Tool Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Tool Category
            </li>
            <li
              className={
                activeLink == "Tool Sub-Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Tool Sub-Category
            </li>
            <li
              className={
                activeLink == "Device Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Device Category
            </li>
            <li
              className={
                activeLink == "Task Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Task Category
            </li>
            <li
              className={
                activeLink == "Task Status"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Task Status
            </li>
            <li
              className={
                activeLink == "Notes Status"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Notes Status
            </li>
            <li
              className={
                activeLink == "Notes Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Notes Category
            </li>
            <li
              className={
                activeLink == "Customer Type"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Customer Type
            </li>
            <li
              className={
                activeLink == "Customer Term"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Customer Term
            </li>
            <li
              className={
                activeLink == "Tax Code"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Tax Code
            </li>
            <li
              className={
                activeLink == "Material Level"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Material Level
            </li>
            <li
              className={
                activeLink == "Labor Level"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Labor Level
            </li>
            <li
              className={
                activeLink == "Salesperson Code"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Salesperson Code
            </li>
            <li
              className={
                activeLink == "Job Type"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Job Type
            </li>
            <li
              className={
                activeLink == "Phase" ? "activeLink simpleLink" : "simpleLink"
              }
            >
              Phase
            </li>
          </ul>
        ) : null}
      </section>
      <section className={`${poppins.className} content-wrap`}>
        {activeLink == "Employee" ? <Employees /> : null}
        {activeLink == "Time Track" ? <TimeTrack /> : null}
        {activeLink == "User Type" ? (
          <PicklistComp picklistName={"User Type"} />
        ) : null}
        {activeLink == "Position" ? (
          <PicklistComp picklistName={"Position"} />
        ) : null}
        {activeLink == "Tool Category" ? (
          <PicklistComp picklistName={"Tool Category"} />
        ) : null}
        {activeLink == "Tool Sub-Category" ? (
          <PicklistComp picklistName={"Tool Sub-Category"} />
        ) : null}
        {activeLink == "Device Category" ? (
          <PicklistComp picklistName={"Device Category"} />
        ) : null}
        {activeLink == "Task Category" ? (
          <PicklistComp picklistName={"Task Category"} />
        ) : null}
        {activeLink == "Task Status" ? (
          <PicklistComp picklistName={"Task Status"} />
        ) : null}
        {activeLink == "Notes Status" ? (
          <PicklistComp picklistName={"Notes Status"} />
        ) : null}
        {activeLink == "Notes Category" ? (
          <PicklistComp picklistName={"Notes Category"} />
        ) : null}
        {activeLink == "Customer Type" ? (
          <PicklistComp picklistName={"Customer Type"} />
        ) : null}
        {activeLink == "Customer Term" ? (
          <PicklistComp picklistName={"Customer Term"} />
        ) : null}
        {activeLink == "Tax Code" ? (
          <PicklistComp picklistName={"Tax Code"} />
        ) : null}
        {activeLink == "Material Level" ? (
          <PicklistComp picklistName={"Material Level"} />
        ) : null}
        {activeLink == "Labor Level" ? (
          <PicklistComp picklistName={"Labor Level"} />
        ) : null}
        {activeLink == "Salesperson Code" ? (
          <PicklistComp picklistName={"Salesperson Code"} />
        ) : null}
        {activeLink == "Job Type" ? (
          <PicklistComp picklistName={"Job Type"} />
        ) : null}
        {activeLink == "Phase" ? <PicklistComp picklistName={"Phase"} /> : null}
      </section>
    </main>
  );
}
