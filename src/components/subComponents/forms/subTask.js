import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { DatePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function SubTaskForm({ handleForm, editFlag, currentItem, editSubTaskData }) {
  const currentUser = useSelector((state) => state.user.user);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState("");
  const [taskCategoryOpt, setTaskCategoryOpt] = useState([]);
  const [taskCategory, setTaskCategory] = useState("");
  const [taskStatusOpt, setTaskStatusOpt] = useState([]);
  const [taskStatus, setTaskStatus] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedToOpt, setAssignedToOpt] = useState([]);
  const [user, setUser] = useState(
    currentUser && currentUser.userInfo ? currentUser.userInfo.fullname : ""
  );
  useEffect(() => {
    if (editFlag == false) {
      dataEntryRefresh();
    }
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
    if (editFlag) {
      setCurrentDate(moment(currentItem.currentDate).format());
      setDueDate(moment(currentItem.dueDate).format());
      setUser(currentItem.user);
      setDescription(currentItem.description);
      setTaskCategory({
        label: currentItem.taskCategory,
        value: currentItem.taskCategory,
      });
      setTaskStatus({
        label: currentItem.taskStatus,
        value: currentItem.taskStatus,
      });
      setAssignedTo(
        currentItem.assignedTo.map((i) => {
          return { label: i.fullname, value: i.fullname };
        })
      );
    }
  }, [editFlag]);
  const handleFormInner = (e) => {
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
    };
    if (editFlag) {
      editSubTaskData(dataObj, currentItem.id);
      dataEntryRefresh();
    } else {
      handleForm(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setTaskCategory("");
    setDueDate("");
    setDescription("");
    setTaskStatus("");
    setAssignedTo([]);
  };
  return (
    <form className="input-wraps" onSubmit={handleFormInner}>
      <div className="single-inp">
        <label>Current Date</label>
        <DatePicker disabled value={currentDate} />
      </div>
      <div className="single-inp">
        <label>User</label>
        <input
          className={poppins.className}
          type="text"
          value={user}
          disabled
        />
      </div>
      <div className="single-inp">
        <label>Task Category</label>
        <Select
          className={poppins.className}
          options={taskCategoryOpt}
          value={taskCategory}
          onChange={(value) => setTaskCategory(value)}
        />
      </div>
      <div className="single-inp">
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
      <div className="single-inp">
        <label>Description</label>
        <input
          type="text"
          className={poppins.className}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="single-inp">
        <label>Task Status</label>
        <Select
          className={poppins.className}
          options={taskStatusOpt}
          value={taskStatus}
          onChange={(value) => setTaskStatus(value)}
        />
      </div>
      <div className="single-inp">
        <label>Assigned To</label>
        <Select
          isMulti
          value={assignedTo}
          className={poppins.className}
          options={assignedToOpt}
          onChange={(v) => setAssignedTo(v)}
        />
      </div>
      <div className="sub-btn-wrap">
        <input
          className={`${poppins.className} add-task`}
          type="submit"
          value={editFlag ? "Edit Task" : "Add Task"}
        />
      </div>
    </form>
  );
}

export default SubTaskForm;
