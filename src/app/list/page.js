"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Tools from "../../components/tools";
import Devices from "../../components/devices";
import Vehicles from "../../components/vehicles";
import "./list.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function List() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Tools");
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
        </ul>
      </section>
      <section className={`${poppins.className} content-wrap`}>
        {activeLink == "Tools" ? <Tools picklistName={"Tools"} /> : null}
      </section>
      <section className={`${poppins.className} content-wrap`}>
        {activeLink == "Devices" ? <Devices picklistName={"Tools"} /> : null}
      </section>
      <section className={`${poppins.className} content-wrap`}>
        {activeLink == "Vehicles" ? (
          <Vehicles picklistName={"Vehicles"} />
        ) : null}
      </section>
    </main>
  );
}
