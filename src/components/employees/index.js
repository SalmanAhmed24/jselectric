"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import EmployeeTable from "../subComponents/tables/employeeTable";
import EmployeeDrawer from "../subComponents/drawers/employeeDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Employees() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setAllUsers(res.data.allUsers);
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
  const addEmp = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/users/addUser`, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error adding employee. The email used is already associated with another employee",
            timer: 1500,
          });
        }
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setAllUsers(res.data.allUsers);
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
        <h2 className={poppins.className}>Employees</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Employee
        </button>
      </div>
      <div className="table-wrap">
        <EmployeeTable
          loading={loading}
          allUsers={allUsers}
          refreshData={refreshData}
        />
      </div>
      <EmployeeDrawer
        addEmp={addEmp}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Employees;
