"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import TaskDrawer from "../subComponents/drawers/taskDrawer";
import TaskTable from "../subComponents/tables/taskTable";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import { useRouter } from "next/navigation";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import { DatePicker } from "react-rainbow-components";
import moment from "moment";
function Task({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("Task Assigned");
  const [taskCategoryOpt, setTaskCategoryOpt] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [searchForm, setSearchForm] = useState({
    taskCategory: "",
    currentDate: "",
    description: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (user == undefined || user == null) {
      router.push("/login");
    } else {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/task/`)
        .then((res) => {
          var tasks = [];
          res.data.allTasks.forEach((element) => {
            element.assignedTo.forEach((innerEl) => {
              if (innerEl.fullname == user.userInfo.fullname) {
                tasks = [element, ...tasks];
                return tasks;
              }
            });
          });
          setAllTasks(tasks);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      axios.get(`${apiPath.prodPath}/api/taskCategory/`).then((res) => {
        setTaskCategoryOpt(
          res.data.taskCategory.map((i) => {
            return { label: i.name, value: i.name };
          })
        );
      });
    }
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        if (activeTab == "Task Assigned") {
          var tasks = [];
          res.data.allTasks.forEach((element) => {
            element.assignedTo.forEach((innerEl) => {
              if (innerEl.fullname == user.userInfo.fullname) {
                tasks = [element, ...tasks];
                return tasks;
              }
            });
          });
          setAllTasks(tasks);
          setLoading(false);
        } else {
          const filteredTasks = res.data.allTasks.filter(
            (inner) => inner.user == user.userInfo.fullname
          );
          setAllTasks(filteredTasks);
          setLoading(false);
        }
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
  const handleTaskAssigned = () => {
    setActiveTab("Task Assigned");
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        var tasks = [];
        res.data.allTasks.forEach((element) => {
          element.assignedTo.forEach((innerEl) => {
            if (innerEl.fullname == user.userInfo.fullname) {
              tasks = [element, ...tasks];
              return tasks;
            }
          });
        });
        setAllTasks(tasks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleTaskCreated = () => {
    setActiveTab("Task Created");
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        const filteredTasks = res.data.allTasks.filter(
          (inner) => inner.user == user.userInfo.fullname
        );
        setAllTasks(filteredTasks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleTaskCategory = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        taskCategory: value,
      };
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `${apiPath.prodPath}/api/task/?taskCategory=${
          searchForm.taskCategory.value == undefined
            ? ""
            : searchForm.taskCategory.value
        }&currentDate=${
          searchForm.currentDate == ""
            ? ""
            : moment(searchForm.currentDate).format("YYYY-MM-DD")
        }&description=${searchForm.description}`
      )
      .then((res) => {
        if (activeTab == "Task Assigned") {
          var tasks = [];
          res.data.allTasks.forEach((element) => {
            element.assignedTo.forEach((innerEl) => {
              if (innerEl.fullname == user.userInfo.fullname) {
                tasks = [element, ...tasks];
                return tasks;
              }
            });
          });
          setAllTasks(tasks);
          setLoading(false);
        } else {
          const filteredTasks = res.data.allTasks.filter(
            (inner) => inner.user == user.userInfo.fullname
          );
          setAllTasks(filteredTasks);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDate = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        currentDate: value,
      };
    });
  };
  const handleDesc = (e) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };
  const handleClear = () => {
    setSearchForm({
      taskCategory: "",
      currentDate: "",
      description: "",
    });
    refreshData();
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
      <div className="tabs-cus-wrap">
        <span
          onClick={handleTaskAssigned}
          className={
            activeTab == "Task Assigned"
              ? `${poppins.className} activeTab simpleTab`
              : `${poppins.className} simpleTab`
          }
        >
          Tasks assigned to user
        </span>
        <span
          onClick={handleTaskCreated}
          className={
            activeTab == "Task Created"
              ? `${poppins.className} activeTab simpleTab`
              : `${poppins.className} simpleTab`
          }
        >
          Tasks created by user
        </span>
      </div>
      {filterFlag ? null : (
        <span
          className={`${poppins.className} filter-btn`}
          onClick={() => setFilterFlag(true)}
        >
          Filters
        </span>
      )}
      {filterFlag ? (
        <div className="filters-wrap">
          <p
            className="close-icon"
            onClick={() => setFilterFlag(false)}
            style={{ textAlign: "right", marginBottom: "10px" }}
          >
            &#10005;
          </p>
          <form onSubmit={handleSearch}>
            <Select
              className={`${poppins.className} taskOpt-cus`}
              options={taskCategoryOpt}
              placeholder="Task Category"
              onChange={handleTaskCategory}
              value={searchForm.taskCategory}
            />
            <DatePicker
              id="datePicker-1"
              placeholder="Select Date"
              value={searchForm.currentDate}
              onChange={handleDate}
              locale={"en-US"}
            />
            <textarea
              className={`${poppins.className}`}
              rows={2}
              cols={55}
              style={{ padding: "10px" }}
              placeholder="Description"
              value={searchForm.description}
              onChange={handleDesc}
            />
            <input
              type="submit"
              className={`${poppins.className} search-btn`}
              value={"Search"}
            />
          </form>
          {searchForm.currentDate !== "" ||
          searchForm.description !== "" ||
          searchForm.taskCategory !== "" ? (
            <p
              onClick={handleClear}
              className={`${poppins.className} filter-btn`}
            >
              Clear Filter
            </p>
          ) : null}
          <p></p>
        </div>
      ) : null}
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
