"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Tools from "../../components/tools";
import PicklistComp from "../../components/Picklists/picklist";
import "./list.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function List() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("User Type");
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
              activeLink == "User Type" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            User Type
          </li>
          <li
            className={
              activeLink == "Position" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Position
          </li>
          <li
            className={
              activeLink == "Tools" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Tools
          </li>
        </ul>
      </section>
      <section className={`${poppins.className} content-wrap`}>
        {activeLink == "User Type" ? (
          <PicklistComp picklistName={"User Type"} />
        ) : null}
        {activeLink == "Position" ? (
          <PicklistComp picklistName={"Position"} />
        ) : null}
        {activeLink == "Tools" ? <Tools picklistName={"Tools"} /> : null}
      </section>
    </main>
  );
}
