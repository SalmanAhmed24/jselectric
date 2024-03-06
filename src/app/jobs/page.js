"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Job from "../../components/job/job";
import JobNumber from "../../components/jobNumber/index";

import "./job.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function JobPage() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Jobs");
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
              activeLink == "Jobs" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Jobs
          </li>
          <li
            className={
              activeLink == "Job Numbers"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Job Numbers
          </li>
        </ul>
      </section>
      {activeLink == "Jobs" ? <Job /> : null}
      {activeLink == "Job Numbers" ? <JobNumber /> : null}
    </main>
  );
}
