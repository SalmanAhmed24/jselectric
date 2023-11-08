import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import "./style.scss";
import moment from "moment";
import { Poppins } from "next/font/google";
import Select from "react-select";
import { DatePicker, TimePicker } from "react-rainbow-components";
import Swal from "sweetalert2";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { Scheduler } from "@aldabil/react-scheduler";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

function ScheduleModal({ schedules, userObj, refreshData, handleClose, open }) {
  const [drawer, setDrawer] = useState(false);
  const [userOpt, setUserOpt] = useState([userObj]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [scheduledUser, setScheduledUser] = [];
  useEffect(() => {
    setUserOpt([userObj]);
    setUser(userObj);
  }, [open]);

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const dataObj = {
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
    axios
      .post(`${apiPath.prodPath}/api/users/addSchedule/${user.value}`, dataObj)
      .then((res) => {
        handleClose();
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error occured while adding schedule",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Successfully added Schedule",
          });
        }
        refreshData();
        resetValues();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const resetValues = () => {
    startDate("");
    endDate("");
    setUser("");
  };

  const alteredSch =
    schedules &&
    schedules.map((i, ind) => {
      return {
        event_id: ind,
        title: `From ${i.startTime} to ${i.endTime}`,
        start: new Date(
          `${moment(i.date).format("YYYY/MM/DD")} ${i.startTime}`
        ),
        end: new Date(`${moment(i.date).format("YYYY/MM/DD")} ${i.endTime}`),
      };
    });
  console.log("alteredSche", alteredSch);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-inner">
        <div className="main-wrap">
          <p className="close-modal" onClick={handleClose}>
            &#10005;
          </p>
        </div>
        <div className="schedule-wrap">
          <form onSubmit={handleAddSchedule}>
            <div className="input-wrap">
              <label>Employee</label>
              <Select
                options={userOpt}
                value={user}
                onChange={(v) => setUser(v)}
                isDisabled={true}
              />
            </div>
            <div className="input-wrap">
              <label>Date</label>
              <DatePicker
                id="datePicker-1"
                value={date}
                onChange={(value) => setDate(value)}
                locale={"en-US"}
              />
              {date !== "" ? (
                <p
                  onClick={() => {
                    setDate("");
                    setDay("");
                  }}
                  className="clear-value"
                >
                  Clear
                </p>
              ) : null}
            </div>
            <div className="input-wrap">
              <label>Start Time</label>
              <TimePicker
                id="datePicker-1"
                value={startTime}
                onChange={(value) => setStartTime(value)}
                locale={"en-US"}
              />
              {startTime !== "" ? (
                <p
                  onClick={() => {
                    setStartTime("");
                  }}
                  className="clear-value"
                >
                  Clear
                </p>
              ) : null}
            </div>
            <div className="input-wrap">
              <label>End Time</label>
              <TimePicker
                id="datePicker-1"
                value={endTime}
                onChange={(value) => setEndTime(value)}
                locale={"en-US"}
              />
              {startTime !== "" ? (
                <p
                  onClick={() => {
                    setEndTime("");
                  }}
                  className="clear-value"
                >
                  Clear
                </p>
              ) : null}
            </div>
            <div className="sub-btn-wrap">
              <input
                className={`${poppins.className} addEmp`}
                type="submit"
                value={edit ? "Edit Schedule" : "Add Schedule"}
              />
            </div>
          </form>
        </div>
        <Scheduler view="month" events={alteredSch} />
      </div>
    </Modal>
  );
}

export default ScheduleModal;
