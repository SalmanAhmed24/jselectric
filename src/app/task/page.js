"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Task from "../../components/task/task";

import "./job.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function TaskPage() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Tasks");
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
              activeLink == "Tasks" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Tasks
          </li>
        </ul>
      </section>
      {activeLink == "Tasks" ? <Task user={currentUser} /> : null}
    </main>
  );
}
