"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TimeTrackTable from "../subComponents/tables/timeTrackTable";
import TimeTrackDrawer from "../subComponents/drawers/timeTrackDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});

function TimeTrack() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeTrack, setTimeTrack] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [activeSpecFlag, setActiveSpecFlag] = useState(true);
  const [currentItem, setCurrentItem] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/timeTrack/`)
      .then((res) => {
        setTimeTrack(res.data.timeTracks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const users = res.data.allUsers.map((i) => {
          return { label: i.fullname, value: i.fullname };
        });
        setAllUsers(users);
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
  // const addEmp = (data) => {
  //   axios
  //     .post(`${apiPath.prodPath}/api/users/addUser`, data)
  //     .then((res) => {
  //       if (res.data && res.data.error) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: "Error adding employee. The email used is already associated with another employee",
  //           timer: 1500,
  //         });
  //       }
  //       handleCloseDrawer();
  //       refreshData();
  //     })
  //     .catch((err) => console.log(err));
  // };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/timeTrack/`)
      .then((res) => {
        setTimeTrack(res.data.timeTracks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    if (search == "") {
      return false;
    }
    axios
      .get(`${apiPath.prodPath}/api/timeTrack/${search.value}`)
      .then((res) => {
        setTimeTrack(res.data.timeTrack);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/timeTrack/`)
      .then((res) => {
        setTimeTrack(res.data.timeTracks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setSearch("");
  };
  const editTimeTrackModal = (item) => {
    setCurrentItem(item);
    setDrawer(true);
  };
  const specTrackData = timeTrack.filter((i) => i.spectrum == true);
  const noSpecTrackData = timeTrack.filter((i) => i.spectrum == false);
  const editData = (data, id) => {
    axios.patch(`${apiPath.prodPath}/api/timeTrack/${id}`, data).then((res) => {
      if (res.data.error) {
        Swal.fire({
          icon: "error",
          text: "Uneable to edit",
        });
      } else {
        Swal.fire({
          icon: "success",
          text: "Edited Successfully",
          showConfirmButton: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            refreshData();
          }
        });
      }
    });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Time Track</h2>
        {/* <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Employee
        </button> */}
      </div>
      <div className="search-wrap">
        <form onSubmit={handleSearch}>
          <Select
            className={poppins.className}
            options={allUsers}
            placeholder="Select Employee"
            value={search}
            onChange={(e) => setSearch(e)}
          />
          <input
            className={`${poppins.className} search-btn`}
            type="submit"
            value={"Search"}
          />
          {search == "" ? null : (
            <p
              onClick={handleClear}
              className={`${poppins.className} clear-btn`}
              style={{ color: "red" }}
            >
              Clear
            </p>
          )}
        </form>
      </div>
      <div className="table-wrap">
        {/* <p>table comes here</p> */}
        <span
          onClick={() => setActiveSpecFlag(true)}
          className={`${poppins.className} ${
            activeSpecFlag ? "activeSpec simpleSpec" : "simpleSpec"
          }`}
        >
          Spectrum
        </span>
        <span
          onClick={() => setActiveSpecFlag(false)}
          className={`${poppins.className} ${
            activeSpecFlag == false ? "activeSpec simpleSpec" : "simpleSpec"
          }`}
        >
          Non Spectrum
        </span>
        <TimeTrackTable
          loading={loading}
          allTimeTrack={activeSpecFlag ? specTrackData : noSpecTrackData}
          refreshData={refreshData}
          handleEdit={editTimeTrackModal}
        />
      </div>
      <TimeTrackDrawer
        timeTrackData={currentItem}
        open={drawer}
        onClose={handleCloseDrawer}
        editTimeTrackData={editData}
      />
    </section>
  );
}

export default TimeTrack;
