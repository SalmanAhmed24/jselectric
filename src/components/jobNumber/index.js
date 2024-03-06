"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import JobNumberTable from "../subComponents/tables/jobNumberTable";
import JobNumberDrawer from "../subComponents/drawers/jobNumberDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function JobNumber() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allJobNumbers, setAllJobNumbers] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        setAllJobNumbers(res.data.jobNumbers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addJobNumber = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/jobNumber/addJobNumber`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        setAllJobNumbers(res.data.jobNumbers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Job Numbers</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Job Number
        </button>
      </div>
      <div className="table-wrap">
        <JobNumberTable
          loading={loading}
          allJobNumbers={allJobNumbers}
          refreshData={refreshData}
        />
      </div>
      <JobNumberDrawer
        addJobNumber={addJobNumber}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default JobNumber;
