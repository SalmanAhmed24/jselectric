"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import PicklistTable from "../subComponents/tables/picklistTable";
import PicklistDrawer from "../subComponents/drawers/picklistDrawer";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function PicklistComp({ picklistName }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picklistData, setPicklistData] = useState([]);
  useEffect(() => {
    let apiUrl;
    if (picklistName == "User Type") {
      apiUrl = `${apiPath.prodPath}/api/userType/`;
    }
    if (picklistName == "Position") {
      apiUrl = `${apiPath.prodPath}/api/position/`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((res) => {
        if (picklistName == "User Type") {
          setPicklistData(res.data.userTypes);
        }
        if (picklistName == "Position") {
          setPicklistData(res.data.positions);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  console.log(picklistData);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addPicklist = (data) => {
    let url;
    if (picklistName == "User Type") {
      url = `${apiPath.prodPath}/api/userType/addUserType`;
    }
    if (picklistName == "Position") {
      url = `${apiPath.prodPath}/api/position/addposition`;
    }
    axios
      .post(url, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error adding ${picklistName}`,
            timer: 1500,
          });
        }
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    console.log("here");
    let url;
    if (picklistName == "User Type") {
      url = `${apiPath.prodPath}/api/userType/`;
    }
    if (picklistName == "Position") {
      url = `${apiPath.prodPath}/api/position/`;
    }
    console.log("url", url);
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (picklistName == "User Type") {
          setPicklistData(res.data.userTypes);
        }
        if (picklistName == "Position") {
          console.log("herhe", res.data);
          setPicklistData(res.data.positions);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>{picklistName}</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add {picklistName}
        </button>
      </div>
      <div className="table-wrap">
        <PicklistTable
          loading={loading}
          picklistData={picklistData}
          picklistName={picklistName}
          refreshData={refreshData}
        />
      </div>
      <PicklistDrawer
        addPicklist={addPicklist}
        open={drawer}
        onClose={handleCloseDrawer}
        picklistName={picklistName}
      />
    </section>
  );
}

export default PicklistComp;
