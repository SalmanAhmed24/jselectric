"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import Tools from "../../components/tools";
import Devices from "../../components/devices";
import Vehicles from "../../components/vehicles";
import Clients from "../../components/clients";
import Schedule from "../../components/schedule/schedule";
import Tagout from "../../components/tagout/index";
import "./list.scss";
import Link from "next/link";
import NeedTagComp from "@/components/needTagComp/needTag-component";
import ToolDamagedComp from "@/components/toolDamageComp/toolDamaged-component";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function List() {
  const [show, setShow] = useState(false);
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const path = usePathname();
  const [activeLink, setActiveLink] = useState("Tools");
  useEffect(() => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo == null) {
      router.push("/login");
    }
  }, [currentUser]);
  const handleLinks = (e) => {
    setActiveLink(e.target.innerText);
  };
  const handleShow = () => {
    setShow(!show);
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
            {show == false ? (
              <span className="plus-minus" onClick={handleShow}>
                &#10011;
              </span>
            ) : null}
            {show ? (
              <span className="plus-minus" onClick={handleShow}>
                &#9866;
              </span>
            ) : null}
            {show ? (
              <div className={`${poppins.className} inner-links-wrap`}>
                <p
                  onClick={() => setActiveLink("Need Tag")}
                  className={
                    activeLink == "Need Tag"
                      ? `${poppins.className} activeP`
                      : `${poppins.className} links`
                  }
                >
                  Need Tag
                </p>
                <p
                  onClick={() => setActiveLink("Tool Damaged")}
                  className={
                    activeLink == "Tool Damaged"
                      ? `${poppins.className} activeP`
                      : `${poppins.className} links`
                  }
                >
                  Tool Damaged
                </p>
              </div>
            ) : null}
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
          <li
            className={
              activeLink == "Lockout/Tagout"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Lockout/Tagout
          </li>
        </ul>
      </section>

      {activeLink == "Need Tag" ? (
        <NeedTagComp
          userInfo={currentUser == null ? "" : currentUser.userInfo}
          picklistName={"Need Tag"}
        />
      ) : null}
      {activeLink == "Tool Damaged" ? (
        <ToolDamagedComp
          userInfo={currentUser == null ? "" : currentUser.userInfo}
          picklistName={"Tool Damaged"}
        />
      ) : null}
      {activeLink == "Tools" ? <Tools picklistName={"Tools"} /> : null}
      {activeLink == "Devices" ? <Devices picklistName={"Tools"} /> : null}
      {activeLink == "Vehicles" ? <Vehicles picklistName={"Vehicles"} /> : null}
      {activeLink == "Clients" ? <Clients picklistName={"Clients"} /> : null}
      {activeLink == "Schedules" ? (
        <Schedule picklistName={"Schedules"} />
      ) : null}
      {activeLink == "Lockout/Tagout" ? (
        <Tagout user={currentUser !== null ? currentUser.userInfo : ""} />
      ) : null}
    </main>
  );
}
