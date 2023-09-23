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
    if (user.user == null) {
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
      </section>
    </main>
  );
}
