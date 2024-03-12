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
  const [usersOpt, setUserOpt] = useState([]);
  const [userFilter, setUserFilter] = useState(false);
  const [userValue, setUserValue] = useState("");
  const [assignToValue, setAssignToValue] = useState("");
  const assignToOpt = [
    { label: "Assigned To", value: "Assigned To" },
    { label: "Assigned By", value: "Assigned By" },
    { label: "Completed", value: "Completed" },
  ];
  const router = useRouter();
  useEffect(() => {
    if (user == undefined || user == null) {
      router.push("/login");
    } else {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/task/`)
        .then((res) => {
          if (
            user.userInfo.fullname == "Kevin Baumhover" ||
            user.userInfo.fullname == "Jamie Schmidt" ||
            user.userInfo.fullname == "Ralph Macias	"
          ) {
            setAllTasks(res.data.allTasks);
          } else {
            var tasks = [];
            res.data.allTasks.forEach((element) => {
              element.assignedTo.forEach((innerEl) => {
                if (innerEl.fullname == user.userInfo.fullname) {
                  tasks = [element, ...tasks];
                  return tasks;
                }
              });
            });
            const taskWithoutComp = tasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskWithoutComp);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      axios
        .get(`${apiPath.prodPath}/api/users/`)
        .then((res) => {
          setUserOpt(
            res.data.allUsers.map((i) => {
              return { label: i.fullname, value: i.fullname };
            })
          );
        })
        .catch((err) => console.log(err));
      axios
        .get(`${apiPath.prodPath}/api/taskCategory/`)
        .then((res) => {
          setTaskCategoryOpt(
            res.data.taskCategory.map((i) => {
              return { label: i.name, value: i.name };
            })
          );
        })
        .catch((err) => console.log(err));
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
        if (
          user !== null &&
          user.userInfo !== undefined &&
          (user.userInfo.fullname == "Kevin Baumhover" ||
            user.userInfo.fullname == "Jamie Schmidt" ||
            user.userInfo.fullname == "Ralph Macias")
        ) {
          setAllTasks(res.data.allTasks);
          setLoading(false);
        } else {
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
            const taskWithoutComp = tasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskWithoutComp);
            setLoading(false);
          } else if (activeTab == "Task Created") {
            const filteredTasks = res.data.allTasks.filter(
              (inner) => inner.user == user.userInfo.fullname
            );
            const taskCreatedWithoutComp = filteredTasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskCreatedWithoutComp);
            setLoading(false);
          } else {
            const filteredTasks = res.data.allTasks
              .filter((inner) => inner.taskStatus == "Completed")
              .filter((inner) => inner.user == user.userInfo.fullname);
            setAllTasks(filteredTasks);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleAddTask = (data, id, userEmails) => {
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
        sendEmails(data, [
          {
            fullname: "Salman Ahmed Abbasi",
            email: "salman.ahmed.abbasi.24@gmail.com",
          },
          ...userEmails,
        ]);
      }
    });
  };
  const sendEmails = (data, emails) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/newTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emails, taskData: data }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
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
        const taskWithoutComp = tasks.filter(
          (i) => i.taskStatus !== "Completed"
        );
        setAllTasks(taskWithoutComp);
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
        const taskCreatedWithoutComp = filteredTasks.filter(
          (i) => i.taskStatus !== "Completed"
        );
        setAllTasks(taskCreatedWithoutComp);
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
        if (
          user !== null &&
          user.userInfo !== undefined &&
          (user.userInfo.fullname == "Kevin Baumhover" ||
            user.userInfo.fullname == "Jamie Schmidt" ||
            user.userInfo.fullname == "Ralph Macias")
        ) {
          setAllTasks(res.data.allTasks);
          setLoading(false);
        } else {
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
            const taskWithoutComp = tasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskWithoutComp);
            setLoading(false);
          } else if (activeTab == "Task Created") {
            const filteredTasks = res.data.allTasks.filter(
              (inner) => inner.user == user.userInfo.fullname
            );
            const taskCreatedWithoutComp = filteredTasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskCreatedWithoutComp);
            setLoading(false);
          } else {
            const filteredTasks = res.data.allTasks
              .filter((inner) => inner.taskStatus == "Completed")
              .filter((inner) => inner.user == user.userInfo.fullname);
            setAllTasks(filteredTasks);
            setLoading(false);
          }
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
  const handleUserClear = () => {
    setUserValue("");
    setAssignToValue("");
    refreshData();
  };
  const handleTaskCompleted = () => {
    setActiveTab("Task Completed");
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        const filteredTasks = res.data.allTasks
          .filter((inner) => inner.taskStatus == "Completed")
          .filter((inner) => inner.user == user.userInfo.fullname);
        setAllTasks(filteredTasks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleUserFilter = (e) => {
    e.preventDefault();
    if (
      userValue.value !== "" &&
      userValue.value !== undefined &&
      assignToValue.value !== undefined &&
      assignToValue.value !== ""
    ) {
      if (assignToValue.value == "Assigned By") {
        const filteredUser = allTasks.filter((i) => i.user == userValue.value);
        setAllTasks(filteredUser);
      }
      if (assignToValue.value == "Completed") {
        const filteredTask = allTasks.filter(
          (i) => i.taskStatus == assignToValue.value
        );
        setAllTasks(filteredTask);
      }
      if (assignToValue.value == "Assigned To") {
        var tasks = [];
        allTasks.forEach((el) => {
          el.assignedTo.forEach((inner) => {
            if (inner.fullname == userValue.value) {
              tasks = [el, ...tasks];
            }
          });
        });
        setAllTasks(tasks);
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Select both the values to get results",
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
      {userFilter ? (
        <div className="filters-wrap">
          <p
            className="close-icon"
            onClick={() => {
              setUserFilter(false);
              handleUserClear();
            }}
            style={{ textAlign: "right", marginBottom: "10px" }}
          >
            &#10005;
          </p>
          <form onSubmit={handleUserFilter}>
            <Select
              className={`${poppins.className} taskOpt-cus`}
              options={usersOpt}
              placeholder="User"
              onChange={(value) => setUserValue(value)}
              value={userValue}
            />
            <Select
              className={`${poppins.className} taskOpt-cus`}
              options={assignToOpt}
              placeholder="Assigned"
              onChange={(value) => setAssignToValue(value)}
              value={assignToValue}
            />
            <input
              type="submit"
              className={`${poppins.className} search-btn`}
              value={"Search"}
            />
          </form>
          {assignToValue !== "" || userValue !== "" ? (
            <p
              onClick={handleUserClear}
              className={`${poppins.className} filter-btn`}
            >
              Clear Filter
            </p>
          ) : null}
          <p></p>
        </div>
      ) : null}
      {user !== null &&
      user.userInfo !== undefined &&
      (user.userInfo.fullname == "Kevin Baumhover" ||
        user.userInfo.fullname == "Jamie Schmidt" ||
        user.userInfo.fullname == "Ralph Macias") ? null : (
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
          <span
            onClick={handleTaskCompleted}
            className={
              activeTab == "Task Completed"
                ? `${poppins.className} activeTab simpleTab`
                : `${poppins.className} simpleTab`
            }
          >
            Tasks Completed
          </span>
        </div>
      )}
      {filterFlag ? null : (
        <span
          className={`${poppins.className} filter-btn`}
          onClick={() => {
            setFilterFlag(true);
            setUserFilter(false);
            handleUserClear();
          }}
        >
          Filter By Task
        </span>
      )}
      {userFilter ? null : (
        <span
          style={{ marginLeft: "10px" }}
          className={`${poppins.className} filter-btn`}
          onClick={() => {
            setUserFilter(true);
            setFilterFlag(false);
            handleClear();
          }}
        >
          Filter By User
        </span>
      )}
      {filterFlag ? (
        <div className="filters-wrap">
          <p
            className="close-icon"
            onClick={() => {
              setFilterFlag(false);
              handleClear();
            }}
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
          loggedInUser={user !== null && user.userInfo}
        />
      </div>
      <TaskDrawer
        loggedInUser={user !== null && user.userInfo}
        open={drawer}
        onClose={handleCloseDrawer}
        addTask={handleAddTask}
        edit={false}
      />
    </section>
  );
}

export default Task;
