"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Employees from "../../components/employees";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function Settings() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Employees");
  useEffect(() => {
    if (user.user == null) {
      router.push("/login");
    }
  }, [user]);
  const handleLinks = (e) => {};
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
      </section>
      <section className={`${poppins.className} content-wrap`}>
        {activeLink == "Employees" ? <Employees /> : null}
      </section>
    </main>
  );
}
