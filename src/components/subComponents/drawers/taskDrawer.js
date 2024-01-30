import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { DatePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
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
  const [user, setUser] = useState(
    loggedInUser && loggedInUser.userInfo ? loggedInUser.userInfo.fullname : ""
  );

  useEffect(() => {
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
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        setAssignedToOpt(
          res.data.allUsers.map((i) => {
            return { label: i.fullname, value: i.fullname };
          })
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
      setCurrentDate(moment(data.currentDate).format());
      setDueDate(moment(data.dueDate).format());
      setUser(data.user);
      setDescription(data.description);
      setTaskCategory({ label: data.taskCategory, value: data.taskCategory });
      setTaskStatus({ label: data.taskStatus, value: data.taskStatus });
      setAssignedTo(
        data.assignedTo.map((i) => {
          return { label: i.fullname, value: i.fullname };
        })
      );
      setSelectedModule({
        label: data.selectedModule,
        value: data.selectedModule,
      });
    }
  }, []);
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
      assignedTo: assignedTo.map((i) => {
        return { fullname: i.label };
      }),
      selectedModule: selectedModule.value,
    };
    if (edit) {
      editTask(dataObj, id);
      dataEntryRefresh();
    } else {
      addTask(dataObj, edit, (id = null));
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
  };
  const selectedModuleOpt = [
    { label: "Clients", value: "Clients" },
    { label: "Devices", value: "Devices" },
    { label: "Employees", value: "Employees" },
    { label: "Invoices", value: "Invoices" },
    { label: "Jobs", value: "Jobs" },
    { label: "Tools", value: "Tools" },
    { label: "Vehicles", value: "Vehicles" },
    { label: "Vendors", value: "Vendors" },
  ];
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
            <DatePicker disabled value={currentDate} />
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
            />
          </div>
          <div className="input-wrap">
            <label>Due Date</label>
            <DatePicker
              id="datePicker-1"
              value={dueDate}
              onChange={(value) => setDueDate(value)}
              locale={"en-US"}
            />
            {dueDate !== "" ? (
              <p onClick={() => setDueDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>Description</label>
            <input
              type="text"
              className={poppins.className}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Task Status</label>
            <Select
              className={poppins.className}
              options={taskStatusOpt}
              value={taskStatus}
              onChange={(value) => setTaskStatus(value)}
            />
          </div>
          <div className="input-wrap">
            <label>Assigned To</label>
            <Select
              isMulti
              value={assignedTo}
              className={poppins.className}
              options={assignedToOpt}
              onChange={(v) => setAssignedTo(v)}
            />
          </div>
          <div className="input-wrap">
            <label>Module</label>
            <Select
              className={poppins.className}
              options={selectedModuleOpt}
              value={selectedModule}
              onChange={(value) => setSelectedModule(value)}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Task" : "Add Task"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default TaskDrawer;
