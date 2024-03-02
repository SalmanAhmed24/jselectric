import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import "react-datepicker/dist/react-datepicker.css";
function TaskDrawer({
  open,
  onClose,
  addTask,
  id,
  edit,
  data,
  loggedInUser,
  editTask,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState("");
  const [taskCategoryOpt, setTaskCategoryOpt] = useState([]);
  const [taskCategory, setTaskCategory] = useState("");
  const [taskStatusOpt, setTaskStatusOpt] = useState([]);
  const [taskStatus, setTaskStatus] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedToOpt, setAssignedToOpt] = useState([]);
  const [selectedModule, setSelectedModule] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [allDevices, setAllDevices] = useState([]);
  const [allEmp, setAllEmp] = useState([]);
  const [allJob, setAllJob] = useState([]);
  const [allTools, setAllTools] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [clients, setClients] = useState([]);
  const [devices, setDevices] = useState([]);
  const [emp, setEmp] = useState([]);
  const [job, setJob] = useState([]);
  const [tool, setTool] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [taskPriority, setTaskPriority] = useState("");
  const [taskPriorityOpt, setTaskPriorityOpt] = useState("");
  const [user, setUser] = useState(loggedInUser ? loggedInUser.fullname : "");

  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(
          res.data.clients.map((inner) => {
            return {
              label: inner.customerName,
              value: inner.customerName,
              selectedModule: "Clients",
              id: inner.id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiPath.prodPath}/api/devices/`)
      .then((res) => {
        setAllDevices(
          res.data.devices.map((inner) => {
            return {
              label: inner.make,
              value: inner.make,
              selectedModule: "Devices",
              id: inner.id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setAllEmp(
          res.data.allUsers.map((inner) => {
            return {
              label: inner.fullname,
              value: inner.fullname,
              selectedModule: "Employees",
              id: inner.id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${apiPath.prodPath}/api/job/`)
      .then((res) => {
        setAllJob(
          res.data.jobs.map((inner) => {
            return {
              label: inner.jobId,
              value: inner.jobId,
              selectedModule: "Jobs",
              id: inner.id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(
          res.data.allTools.map((inner) => {
            return {
              label: inner.toolNumber,
              value: inner.toolNumber,
              selectedModule: "Tools",
              id: inner.id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        setAllVehicles(
          res.data.vehicles.map((inner) => {
            return {
              label: inner.vehicleNo,
              value: inner.vehicleNo,
              selectedModule: "Vehicles",
              id: inner.id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${apiPath.prodPath}/api/taskCategory`)
      .then((res) => {
        setTaskCategoryOpt(
          res.data.taskCategory.map((i) => {
            return { label: i.name, value: i.name };
          })
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/taskStatus`)
      .then((res) => {
        setTaskStatusOpt(
          res.data.taskStatus.map((i) => {
            return { label: i.name, value: i.name };
          })
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/taskPriority`)
      .then((res) => {
        setTaskPriorityOpt(
          res.data.taskPriority.map((i) => {
            return { label: i.name, value: i.name };
          })
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        setAssignedToOpt(
          res.data.allUsers.map((i) => {
            return { label: i.fullname, value: i.fullname, email: i.email };
          })
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
      setCurrentDate(new Date(data.currentDate));
      setDueDate(new Date(data.dueDate));
      setUser(data.user);
      setTaskPriority({ label: data.taskPriority, value: data.taskPriority });
      setDescription(data.description);
      setTaskCategory({ label: data.taskCategory, value: data.taskCategory });
      setTaskStatus({ label: data.taskStatus, value: data.taskStatus });
      setAssignedTo(
        data.assignedTo.map((i) => {
          return { label: i.fullname, value: i.fullname };
        })
      );
      setSelectedModule(
        data.selectedModule.map((i) => {
          return { label: i, value: i };
        })
      );
      data.selectedModule.forEach((element) => {
        if (element == "Clients") {
          setClients(data.moduleArr.find((i) => i.selectedModule == "Clients"));
        }
        if (element == "Devices") {
          setDevices(data.moduleArr.find((i) => i.selectedModule == "Devices"));
        }
        if (element == "Employees") {
          setEmp(data.moduleArr.find((i) => i.selectedModule == "Employees"));
        }
        if (element == "Jobs") {
          setJob(data.moduleArr.find((i) => i.selectedModule == "Jobs"));
        }
        if (element == "Tools") {
          setTool(data.moduleArr.find((i) => i.selectedModule == "Tools"));
        }
        if (element == "Vehicles") {
          setVehicle(
            data.moduleArr.find((i) => i.selectedModule == "Vehicles")
          );
        }
      });
    }
  }, [open]);
  function validatePhoneNumber(input_str) {
    const re = /^[0-9-]+$/;
    return re.test(input_str);
  }
  const validatePhone = (phone) => {
    const flagPhone = validatePhoneNumber(phone);
    if (flagPhone) {
      setPhoneNo(phone);
    }
  };
  const handleAddDevice = (e) => {
    e.preventDefault();
    const dataObj = {
      currentDate,
      user,
      taskCategory: taskCategory.value,
      dueDate,
      description,
      taskStatus: taskStatus.value,
      taskPriority: taskPriority.value,
      assignedTo: assignedTo.map((i) => {
        return { fullname: i.label };
      }),
      selectedModule: selectedModule.map((i) => {
        return i.value;
      }),
      moduleArr: selectedModule.map((item) => {
        if (item.label == "Devices") {
          return devices;
        }
        if (item.label == "Clients") {
          return clients;
        }
        if (item.label == "Employees") {
          return emp;
        }
        if (item.label == "Jobs") {
          return job;
        }
        if (item.label == "Tools") {
          return tool;
        }
        if (item.label == "Vehicles") {
          return vehicle;
        }
      }),
    };
    if (edit) {
      var assignedToUsers = [];
      assignedToOpt.forEach((item) => {
        dataObj.assignedTo.forEach((el) => {
          if (el.fullname == item.label) {
            assignedToUsers = [
              ...assignedToUsers,
              { fullname: item.label, email: item.email },
            ];
          }
        });
      });
      editTask(dataObj, id, assignedToUsers);
      dataEntryRefresh();
    } else {
      var assignedToUsers = [];
      assignedToOpt.forEach((item) => {
        dataObj.assignedTo.forEach((el) => {
          if (el.fullname == item.label) {
            assignedToUsers = [
              ...assignedToUsers,
              { fullname: item.label, email: item.email },
            ];
          }
        });
      });
      console.log("assignedToUser", assignedToUsers);

      addTask(dataObj, (id = null), assignedToUsers);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setTaskCategory("");
    setDueDate("");
    setDescription("");
    setTaskStatus("");
    setAssignedTo([]);
    setSelectedModule("");
    setDevices("");
    setClients("");
    setEmp("");
    setJob("");
    setVehicle("");
    setTool("");
    setTaskPriority("");
  };
  const selectedModuleOpt = [
    { label: "Clients", value: "Clients" },
    { label: "Devices", value: "Devices" },
    { label: "Employees", value: "Employees" },
    { label: "Jobs", value: "Jobs" },
    { label: "Tools", value: "Tools" },
    { label: "Vehicles", value: "Vehicles" },
  ];
  const handleModuleSelection = (value) => {
    setSelectedModule(value);
  };
  console.log("options", allClients);
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <p className="close-modal" onClick={onClose}>
          &#10005;
        </p>
        <form onSubmit={handleAddDevice}>
          <div className="input-wrap">
            <label>Current Date</label>
            <DatePicker disabled selected={currentDate} />
          </div>
          <div className="input-wrap">
            <label>User</label>
            <input
              className={poppins.className}
              type="text"
              value={user}
              disabled
            />
          </div>
          <div className="input-wrap">
            <label>Task Category</label>
            <Select
              className={poppins.className}
              options={taskCategoryOpt}
              value={taskCategory}
              onChange={(value) => setTaskCategory(value)}
              isDisabled={
                edit ? (data.taskStatus == "Completed" ? true : false) : false
              }
            />
          </div>
          <div className="input-wrap">
            <label>Due Date</label>
            <DatePicker
              id="datePicker-1"
              selected={dueDate}
              onChange={(value) => setDueDate(value)}
              disabled={
                edit ? (data.taskStatus == "Completed" ? true : false) : false
              }
            />
            {dueDate !== "" ? (
              <p onClick={() => setDueDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap" style={{ width: "100%" }}>
            <label>Description</label>
            <textarea
              type="text"
              rows={3}
              cols={12}
              className={poppins.className}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={
                edit ? (data.taskStatus == "Completed" ? true : false) : false
              }
            />
          </div>
          <div className="input-wrap">
            <label>Task Status</label>
            <Select
              className={poppins.className}
              options={taskStatusOpt}
              value={taskStatus}
              onChange={(value) => setTaskStatus(value)}
              isDisabled={
                edit ? (data.taskStatus == "Completed" ? true : false) : false
              }
            />
          </div>
          <div className="input-wrap">
            <label>Task Priority</label>
            <Select
              className={poppins.className}
              options={taskPriorityOpt}
              value={taskPriority}
              onChange={(v) => setTaskPriority(v)}
              isDisabled={
                edit ? (data.taskStatus == "Completed" ? true : false) : false
              }
            />
          </div>
          <div className="input-wrap" style={{ width: "100%" }}>
            <label>Assigned To</label>
            <Select
              isMulti
              value={assignedTo}
              className={poppins.className}
              options={assignedToOpt}
              onChange={(v) => setAssignedTo(v)}
              isDisabled={
                edit ? (data.taskStatus == "Completed" ? true : false) : false
              }
            />
          </div>
          <div className="input-wrap" style={{ width: "100%" }}>
            <label>Module</label>
            <Select
              className={poppins.className}
              options={selectedModuleOpt}
              value={selectedModule}
              isMulti={true}
              onChange={handleModuleSelection}
              isDisabled={
                edit ? (data.taskStatus == "Completed" ? true : false) : false
              }
            />
          </div>
          {selectedModule.length
            ? selectedModule
                .filter((i) => i.label == "Devices")
                .map((i) => {
                  return (
                    <div key={i} className="input-wrap">
                      <label>{i.label}</label>
                      <Select
                        className={poppins.className}
                        options={allDevices}
                        value={devices}
                        onChange={(value) => setDevices(value)}
                        isDisabled={
                          edit
                            ? data.taskStatus == "Completed"
                              ? true
                              : false
                            : false
                        }
                      />
                    </div>
                  );
                })
            : null}
          {selectedModule.length
            ? selectedModule
                .filter((i) => i.label == "Clients")
                .map((i) => {
                  return (
                    <div key={i} className="input-wrap">
                      <label>{i.label}</label>
                      <Select
                        className={poppins.className}
                        options={allClients}
                        value={clients}
                        onChange={(value) => setClients(value)}
                        isDisabled={
                          edit
                            ? data.taskStatus == "Completed"
                              ? true
                              : false
                            : false
                        }
                      />
                    </div>
                  );
                })
            : null}
          {selectedModule.length
            ? selectedModule
                .filter((i) => i.label == "Employees")
                .map((i) => {
                  return (
                    <div key={i} className="input-wrap">
                      <label>{i.label}</label>
                      <Select
                        className={poppins.className}
                        options={allEmp}
                        value={emp}
                        onChange={(value) => setEmp(value)}
                        isDisabled={
                          edit
                            ? data.taskStatus == "Completed"
                              ? true
                              : false
                            : false
                        }
                      />
                    </div>
                  );
                })
            : null}
          {selectedModule.length
            ? selectedModule
                .filter((i) => i.label == "Jobs")
                .map((i) => {
                  return (
                    <div key={i} className="input-wrap">
                      <label>{i.label}</label>
                      <Select
                        className={poppins.className}
                        options={allJob}
                        value={job}
                        onChange={(value) => setJob(value)}
                        isDisabled={
                          edit
                            ? data.taskStatus == "Completed"
                              ? true
                              : false
                            : false
                        }
                      />
                    </div>
                  );
                })
            : null}
          {selectedModule.length
            ? selectedModule
                .filter((i) => i.label == "Tools")
                .map((i) => {
                  return (
                    <div key={i} className="input-wrap">
                      <label>{i.label}</label>
                      <Select
                        className={poppins.className}
                        options={allTools}
                        value={tool}
                        onChange={(value) => setTool(value)}
                        isDisabled={
                          edit
                            ? data.taskStatus == "Completed"
                              ? true
                              : false
                            : false
                        }
                      />
                    </div>
                  );
                })
            : null}
          {selectedModule.length
            ? selectedModule
                .filter((i) => i.label == "Vehicles")
                .map((i) => {
                  return (
                    <div key={i} className="input-wrap">
                      <label>{i.label}</label>
                      <Select
                        className={poppins.className}
                        options={allVehicles}
                        value={vehicle}
                        onChange={(value) => setVehicle(value)}
                        isDisabled={
                          edit
                            ? data.taskStatus == "Completed"
                              ? true
                              : false
                            : false
                        }
                      />
                    </div>
                  );
                })
            : null}
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Task" : "Add Task"}
              disabled={
                edit ? (data.taskStatus == "Completed" ? true : false) : false
              }
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default TaskDrawer;
