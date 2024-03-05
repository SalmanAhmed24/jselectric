import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

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
import "react-datepicker/dist/react-datepicker.css";

function NoteTaskForm({
  handleForm,
  editFlag,
  currentItem,
  editNoteTaskData,
  task,
}) {
  const currentUser = useSelector((state) => state.user.user);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState("");
  const [noteCategoryOpt, setNoteCategoryOpt] = useState([]);
  const [noteCategory, setNoteCategory] = useState("");
  const [noteStatusOpt, setNoteStatusOpt] = useState([]);
  const [noteStatus, setNoteStatus] = useState("");
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
      .get(`${apiPath.prodPath}/api/notesCategory`)
      .then((res) => {
        setNoteCategoryOpt(
          res.data.notesCategory.map((i) => {
            return { label: i.name, value: i.name };
          })
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/notesStatus`)
      .then((res) => {
        setNoteStatusOpt(
          res.data.notesStatus.map((i) => {
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
    if (editFlag) {
      setCurrentDate(new Date(currentItem.currentDate));
      setDueDate(new Date(currentItem.dueDate));
      setUser(currentItem.user);
      setDescription(currentItem.description);
      setNoteCategory({
        label: currentItem.noteCategory,
        value: currentItem.noteCategory,
      });
      setNoteStatus({
        label: currentItem.noteStatus,
        value: currentItem.noteStatus,
      });
      // setAssignedTo(
      //   currentItem.assignedTo.map((i) => {
      //     return { label: i.fullname, value: i.fullname };
      //   })
      // );
    }
  }, [editFlag]);
  const handleFormInner = (e) => {
    e.preventDefault();
    const dataObj = {
      currentDate,
      user,
      noteCategory: noteCategory.value,
      dueDate,
      description,
      noteStatus: noteStatus.value,
      updated: editFlag ? true : false,
      // assignedTo: assignedTo.map((i) => {
      //   return { fullname: i.label };
      // }),
    };
    if (editFlag) {
      var assignedToUsers = [];
      assignedToOpt.forEach((item) => {
        task.assignedTo.forEach((el) => {
          if (el.fullname == item.label) {
            assignedToUsers = [
              ...assignedToUsers,
              { fullname: item.label, email: item.email },
            ];
          }
        });
      });
      editNoteTaskData(dataObj, currentItem.id, assignedToUsers);
      dataEntryRefresh();
    } else {
      var assignedToUsers = [];
      assignedToOpt.forEach((item) => {
        task.assignedTo.forEach((el) => {
          if (el.fullname == item.label) {
            assignedToUsers = [
              ...assignedToUsers,
              { fullname: item.label, email: item.email },
            ];
          }
        });
      });
      handleForm(dataObj, assignedToUsers);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setNoteCategory("");
    setDueDate("");
    setDescription("");
    setNoteStatus("");
    // setAssignedTo([]);
  };
  return (
    <form className="input-wraps" onSubmit={handleFormInner}>
      <div className="single-inp">
        <label>Current Date</label>
        <DatePicker disabled selected={currentDate} />
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
        <label>Note Category</label>
        <Select
          className={`${poppins.className} select-cus`}
          options={noteCategoryOpt}
          value={noteCategory}
          onChange={(value) => setNoteCategory(value)}
        />
      </div>
      <div className="single-inp">
        <label>Due Date</label>
        <DatePicker
          id="datePicker-1"
          selected={dueDate}
          onChange={(value) => setDueDate(value)}
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
        <label>Note Status</label>
        <Select
          className={`${poppins.className} select-cus`}
          options={noteStatusOpt}
          value={noteStatus}
          onChange={(value) => setNoteStatus(value)}
        />
      </div>
      {/* <div className="single-inp">
        <label>Assigned To</label>
        <Select
          isMulti
          value={assignedTo}
          className={poppins.className}
          options={assignedToOpt}
          onChange={(v) => setAssignedTo(v)}
        />
      </div> */}
      <div className="sub-btn-wrap">
        <input
          className={`${poppins.className} add-task`}
          type="submit"
          value={editFlag ? "Edit Note" : "Add Note"}
        />
      </div>
    </form>
  );
}

export default NoteTaskForm;
