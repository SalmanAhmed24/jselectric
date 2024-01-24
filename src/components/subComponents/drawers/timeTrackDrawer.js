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
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function TimeTrackDrawer({ open, onClose, timeTrackData, editTimeTrackData }) {
  const [employeeOpt, setEmployeeOpt] = useState("");
  const [employee, setEmployee] = useState("");
  const [jobOpt, setJobOpt] = useState("");
  const [job, setJob] = useState("");
  const [phaseOpt, setPhaseOpt] = useState("");
  const [phase, setPhase] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [checkbox, setCheckbox] = useState([]);
  const [lunchStartTime, setLunchStartTime] = useState("");
  const [lunchEndTime, setLunchEndTime] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
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
    setJob({ label: timeTrackData.job, value: timeTrackData.job });
    setPhase({ label: timeTrackData.phase, value: timeTrackData.phase });
    setDate(timeTrackData.date);
    setStartTime(timeTrackData.startTime);
    setEndTime(timeTrackData.endTime);
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
    const dataObj = {
      employee: employee.value,
      job: job.value,
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
    };

    editTimeTrackData(dataObj, timeTrackData._id);
    handleReset();
    onClose();
  };
  const handleReset = () => {
    setEmployee("");
    setJob("");
    setDate("");
    setPhase("");
    setStartTime("");
    setEndTime("");
    setLunchEndTime("");
    setLunchStartTime("");
    setCheckbox([]);
  };
  const handleCheckbox = (value) => {
    const isLunch = value.filter((i) => i == "lunch");
    if (isLunch.length == 0) {
      setLunchStartTime("");
      setLunchEndTime("");
    }
    console.log("checkbox value", value);
    setCheckbox(value);
  };
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
            <label className={poppins.className}>Job</label>
            <Select
              options={jobOpt}
              value={job}
              onChange={(e) => setJob(e)}
              className={poppins.className}
              required={true}
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
