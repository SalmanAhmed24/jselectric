"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Tools from "../../components/tools";
import Devices from "../../components/devices";
import Vehicles from "../../components/vehicles";
import Clients from "../../components/clients";
import Schedule from "../../components/schedule/schedule";

import "./list.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function List() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Tools");
  useEffect(() => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo == null) {
      router.push("/login");
    }
  }, [currentUser]);
  const handleLinks = (e) => {
    setActiveLink(e.target.innerText);
  };
  return (
    <main className={`${poppins.className} home-dashboard`}>
      <section className="links-wrap">
        <ul onClick={handleLinks} className={poppins.className}>
          <li
            className={
              activeLink == "Tools" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Tools
          </li>
          <li
            className={
              activeLink == "Devices" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Devices
          </li>
          <li
            className={
              activeLink == "Vehicles" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Vehicles
          </li>
          <li
            className={
              activeLink == "Clients" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Clients
          </li>
          <li
            className={
              activeLink == "Schedules" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Schedules
          </li>
        </ul>
      </section>

      {activeLink == "Tools" ? <Tools picklistName={"Tools"} /> : null}
      {activeLink == "Devices" ? <Devices picklistName={"Tools"} /> : null}
      {activeLink == "Vehicles" ? <Vehicles picklistName={"Vehicles"} /> : null}
      {activeLink == "Clients" ? <Clients picklistName={"Clients"} /> : null}
      {activeLink == "Schedules" ? (
        <Schedule picklistName={"Schedules"} />
      ) : null}
    </main>
  );
}
