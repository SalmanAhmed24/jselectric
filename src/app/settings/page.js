"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Employees from "../../components/employees";
import PicklistComp from "../../components/Picklists/picklist";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function Settings() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Employees");
  const [showPick, setShowPick] = useState(false);
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
        <ul onClick={handleLinks} className={poppins.className}>
          <li
            className={
              activeLink == "Employees" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Employees
          </li>
        </ul>
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
          </ul>
        ) : null}
      </section>
      <section className={`${poppins.className} content-wrap`}>
        {activeLink == "Employees" ? <Employees /> : null}
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
      </section>
    </main>
  );
}
