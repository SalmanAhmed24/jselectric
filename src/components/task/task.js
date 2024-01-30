"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import TaskDrawer from "../subComponents/drawers/taskDrawer";
import TaskTable from "../subComponents/tables/taskTable";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Task({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        setAllTasks(res.data.allTasks);
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
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        setAllTasks(res.data.allTasks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleAddTask = (data, editFlag, id) => {
    if (editFlag) {
      // edit goes here
    } else {
      axios.post(`${apiPath.prodPath}/api/task/addTask`, data).then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error Adding Task try again",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Added Successfully",
          });
          refreshData();
          setDrawer(false);
        }
      });
    }
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Tasks</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Task
        </button>
      </div>
      <div className="table-wrap">
        <TaskTable
          allTasks={allTasks}
          loading={loading}
          refreshData={refreshData}
        />
      </div>
      <TaskDrawer
        loggedInUser={user}
        open={drawer}
        onClose={handleCloseDrawer}
        addTask={handleAddTask}
        edit={false}
      />
    </section>
  );
}

export default Task;
