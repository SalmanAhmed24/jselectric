import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { TimePicker, CheckboxGroup } from "react-rainbow-components";
import { DatePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function TimeTrackDrawer({ open, onClose, timeTrackData, editTimeTrackData }) {
  const [employeeOpt, setEmployeeOpt] = useState("");
  const [employee, setEmployee] = useState("");
  const [jobOpt, setJobOpt] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [phaseOpt, setPhaseOpt] = useState("");
  const [phase, setPhase] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [checkbox, setCheckbox] = useState([]);
  const [lunchStartTime, setLunchStartTime] = useState("");
  const [lunchEndTime, setLunchEndTime] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [notes, setNotes] = useState("");
  const [reimbursalCheckbox, setReimbursalCheckbox] = useState([]);
  const [reimbursalOpt, setReimbursalOpt] = useState("");
  const [reimbursalArr, setReimbursalArr] = useState([
    {
      id: uuidv4(),
      reimbursalType: "",
      note: "",
      amount: "",
    },
  ]);
  const addNewForm = () => {
    const newForm = {
      id: uuidv4(),
      reimbursalType: "",
      amount: "",
      note: "",
    };
    setReimbursalArr((arr) => {
      return [...arr, newForm];
    });
  };
  const options = [
    { value: "spectrum", label: "Spectrum", disabled: false },
    { value: "lunch", label: "Lunch", disabled: false },
  ];
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        setEmployeeOpt(
          res.data.allUsers
            .map((i) => {
              return { label: i.fullname, value: i.fullname };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/job`)
      .then((res) => {
        setJobOpt(
          res.data.jobs
            .map((i) => {
              return { label: i.jobId, value: i.jobId };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/reimbursalType/`)
      .then((res) => {
        setReimbursalOpt(
          res.data.reimbursalTypes
            .map((i) => {
              return { label: i.name, value: i.name };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/phase`)
      .then((res) => {
        setPhaseOpt(
          res.data.phases
            .map((i) => {
              return { label: i.name, value: i.name };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    setLoggedInUser(timeTrackData.user);
    setEmployee({
      label: timeTrackData.employee,
      value: timeTrackData.employee,
    });
    setJobDescription(timeTrackData.jobDescription);
    setPhase({ label: timeTrackData.phase, value: timeTrackData.phase });
    setDate(timeTrackData.date);
    setStartTime(timeTrackData.startTime);
    setEndTime(timeTrackData.endTime);
    setNotes(timeTrackData.notes);
    setCheckbox(
      timeTrackData.spectrum && timeTrackData.lunch
        ? ["spectrum", "lunch"]
        : timeTrackData.spectrum == true && timeTrackData.lunch == false
        ? ["spectrum"]
        : timeTrackData.spectrum == false && timeTrackData.lunch == true
        ? ["lunch"]
        : []
    );
    setLunchStartTime(timeTrackData.lunch ? timeTrackData.lunchStartTime : "");
    setLunchEndTime(timeTrackData.lunch ? timeTrackData.lunchEndTime : "");
    setReimbursalCheckbox(
      timeTrackData.reimbursalFlag == "reimbursal" ? ["reimbursal"] : []
    );
    const modifiedValues =
      timeTrackData.reimbursal && timeTrackData.reimbursal.length
        ? timeTrackData.reimbursal.map((i) => {
            return {
              id: i._id,
              reimbursalType: {
                label: i.reimbursalType,
                value: i.reimbursalType,
              },
              amount: i.amount,
              note: i.note,
            };
          })
        : [
            {
              id: uuidv4(),
              reimbursalType: "",
              note: "",
              amount: "",
            },
          ];
    console.log("wow modified", modifiedValues);
    setReimbursalArr(modifiedValues);
  }, [open]);
  const handleEditTimeTrack = (e) => {
    e.preventDefault();
    if (startTime == "") {
      Swal.fire({
        icon: "error",
        text: "Please select the Start Time",
      });
    }
    if (endTime == "") {
      Swal.fire({
        icon: "error",
        text: "Please select the End Time",
      });
    }
    if (checkbox[0] == "lunch" || checkbox[1] == "lunch") {
      if (lunchEndTime == "" || lunchStartTime == "") {
        Swal.fire({
          icon: "error",
          text: "Please Fill Both Start and End time for lunch",
        });
      }
    }
    const filteredData = reimbursalArr.map((i) => {
      return {
        reimbursalType: i.reimbursalType.value,
        amount: i.amount,
        note: i.note,
      };
    });
    const dataObj = {
      employee: employee.value,
      jobDescription: jobDescription,
      notes,
      phase: phase.value,
      date,
      startTime,
      endTime,
      spectrum:
        checkbox[0] == "spectrum" || checkbox[1] == "spectrum" ? true : false,
      lunch: checkbox[0] == "lunch" || checkbox[1] == "lunch" ? true : false,
      lunchEndTime,
      lunchStartTime,
      user: loggedInUser,
      reimbursalFlag: reimbursalCheckbox[0] == "reimbursal" ? "reimbursal" : "",
      reimbursal: filteredData,
    };

    editTimeTrackData(dataObj, timeTrackData._id);
    handleReset();
    onClose();
  };
  const handleReset = () => {
    setEmployee("");
    setJobDescription("");
    setDate("");
    setPhase("");
    setStartTime("");
    setEndTime("");
    setLunchEndTime("");
    setLunchStartTime("");
    setCheckbox([]);
    setNotes("");
    setReimbursalArr([
      {
        id: uuidv4(),
        reimbursalType: "",
        note: "",
        amount: "",
      },
    ]);
    setReimbursalCheckbox([]);
  };
  const handleCheckbox = (value) => {
    const isLunch = value.filter((i) => i == "lunch");
    if (isLunch.length == 0) {
      setLunchStartTime("");
      setLunchEndTime("");
    }
    setCheckbox(value);
  };
  const handleReimCheckbox = (value) => {
    setReimbursalCheckbox(value);
  };
  const handleReimbursalType = (e, i) => {
    const result = reimbursalArr.map((el) => {
      if (el.id == i.id) {
        el.reimbursalType = e;
      }
      return el;
    });
    console.log("###", result);
    setReimbursalArr(result);
  };
  const handleReimbursalAmount = (e, i) => {
    const result = reimbursalArr.map((el) => {
      if (el.id == i.id) {
        el.amount = e.target.value;
      }
      return el;
    });
    setReimbursalArr(result);
  };
  const handleReimbursalNote = (e, i) => {
    const result = reimbursalArr.map((el) => {
      if (el.id == i.id) {
        el.note = e.target.value;
      }
      return el;
    });
    console.log("###", result);
    setReimbursalArr(result);
  };
  const handleRemoveEl = (i) => {
    const filteredArr = reimbursalArr.filter((el) => el.id !== i.id);
    setReimbursalArr(filteredArr);
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div
        className={`${poppins.className} innerDrawerCon`}
        style={{ width: "100%" }}
      >
        <p className="close-modal" onClick={onClose}>
          &#10005;
        </p>
        <form onSubmit={handleEditTimeTrack}>
          <div className="input-wrap">
            <label className={poppins.className}>Employee</label>
            <Select
              options={employeeOpt}
              value={employee}
              onChange={(e) => setEmployee(e)}
              className={poppins.className}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label className={poppins.className}>Job Description</label>
            <input
              type="text"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className={poppins.className}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label className={poppins.className}>Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label className={poppins.className}>Phase</label>
            <Select
              options={phaseOpt}
              value={phase}
              onChange={(e) => setPhase(e)}
              className={poppins.className}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label className={poppins.className}>Date</label>
            <DatePicker
              value={date}
              required={true}
              onChange={(value) => setDate(value)}
            />

            {date !== "" ? (
              <p className={poppins.className} onClick={() => setDate("")}>
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label className={poppins.className}>Start Time</label>
            <TimePicker
              value={startTime}
              onChange={(e) => setStartTime(e)}
              className={poppins.className}
              required={true}
            />
            {startTime !== "" ? (
              <p className={poppins.className} onClick={() => setStartTime("")}>
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label className={poppins.className}>End Time</label>
            <TimePicker
              value={endTime}
              onChange={(e) => setEndTime(e)}
              className={poppins.className}
              required={true}
            />
            {endTime !== "" ? (
              <p className={poppins.className} onClick={() => setEndTime("")}>
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <CheckboxGroup
              id="checkbox-group-1"
              options={options}
              value={checkbox}
              onChange={handleCheckbox}
            />
          </div>
          {checkbox[0] == "lunch" || checkbox[1] == "lunch" ? (
            <div className="input-wrap">
              <label className={poppins.className}>Lunch Start Time</label>
              <TimePicker
                value={lunchStartTime}
                onChange={(e) => setLunchStartTime(e)}
                className={poppins.className}
                required={true}
              />
              {startTime !== "" ? (
                <p
                  className={poppins.className}
                  onClick={() => setLunchStartTime("")}
                >
                  Clear
                </p>
              ) : null}
            </div>
          ) : null}
          {checkbox[0] == "lunch" || checkbox[1] == "lunch" ? (
            <div className="input-wrap">
              <label className={poppins.className}>End Time</label>
              <TimePicker
                value={lunchEndTime}
                onChange={(e) => setLunchEndTime(e)}
                className={poppins.className}
                required={true}
              />
              {lunchEndTime !== "" ? (
                <p
                  className={poppins.className}
                  onClick={() => setLunchEndTime("")}
                >
                  Clear
                </p>
              ) : null}
            </div>
          ) : null}
          <div className="input-wrap">
            <label className={poppins.className}>User</label>
            <input
              type="text"
              disabled={true}
              value={loggedInUser}
              onChange={(e) => setPhase(e)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <CheckboxGroup
              id="checkbox-group-2"
              options={[
                { value: "reimbursal", label: "Reimbursal", disabled: false },
              ]}
              value={reimbursalCheckbox}
              onChange={handleReimCheckbox}
            />
          </div>
          {reimbursalCheckbox[0] == "reimbursal" ? (
            <span
              className={`${poppins.className} btn-add`}
              onClick={addNewForm}
            >
              Add Another Reimbursal
            </span>
          ) : null}
          {reimbursalCheckbox[0] == "reimbursal"
            ? reimbursalArr.map((i) => {
                return (
                  <div key={i.id} style={{ width: "100%", display: "flex" }}>
                    <div className="input-wrap">
                      <label className={poppins.className}>
                        Reimbursal Type
                      </label>
                      <Select
                        name={`reimbursalType${i.id}`}
                        options={reimbursalOpt}
                        value={i.reimbursalType}
                        onChange={(e) => {
                          handleReimbursalType(e, i);
                        }}
                        className={poppins.className}
                        required={true}
                      />
                    </div>
                    <div className="input-wrap">
                      <label className={poppins.className}>Amount</label>
                      <input
                        name={`amount${i.id}`}
                        placeholder="Enter Amount"
                        value={i.amount}
                        onChange={(e) => {
                          handleReimbursalAmount(e, i);
                        }}
                        className={poppins.className}
                        required={true}
                      />
                    </div>
                    <div className="input-wrap">
                      <label className={poppins.className}>Note</label>
                      <textarea
                        name={`note${i.id}`}
                        placeholder="Enter Note"
                        value={i.note}
                        onChange={(e) => {
                          handleReimbursalNote(e, i);
                        }}
                        className={poppins.className}
                      />
                    </div>
                    {reimbursalArr.length > 1 ? (
                      <span
                        className="minus"
                        style={{ fontSize: "22px" }}
                        onClick={() => handleRemoveEl(i)}
                      >
                        &#9866;
                      </span>
                    ) : null}
                  </div>
                );
              })
            : null}
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={"Edit Time Track"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default TimeTrackDrawer;
