import React, { useState, useEffect } from "react";
import "./style.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import AddBadge from "../forms/addBadge";
import axios from "axios";
import { apiPath } from "@/utils/routes";
function BadgeTab({ item, refreshData, closeModal }) {
  const [show, setShow] = useState(false);
  const showFields = () => {
    setShow(!show);
  };
  const addBadgeHandler = (data) => {
    axios
      .patch(`${apiPath.prodPath}/api/users/addBadges/${item.id}`, data)
      .then((res) => {
        refreshData();
        closeModal();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="badges-tab">
      {show ? <AddBadge addBadgeFunc={addBadgeHandler} /> : null}
      <div className="main-wrap">
        {item.badges == undefined ? (
          <button className={poppins.className} onClick={showFields}>
            Add Badges
          </button>
        ) : (
          <button className={poppins.className}>Edit Badges</button>
        )}
      </div>
      <div>
        {item.badges == undefined ? (
          <p>No data for badges found</p>
        ) : (
          <div className="badgeInfo-data">
            <div className="single-item">
              <label>AISD</label>
              <p>{item.badges.AISD}</p>
            </div>
            <div className="single-item">
              <label>AISD Exp Date</label>
              <p>{item.badges.AISDExpDate}</p>
            </div>
            <div className="single-item">
              <label>COA Water Dep</label>
              <p>{item.badges.COAWaterDep}</p>
            </div>
            <div className="single-item">
              <label>COA Water Dept Exp Date</label>
              <p>{item.badges.COAWaterDepExpDate}</p>
            </div>
            <div className="single-item">
              <label>TFC</label>
              <p>{item.badges.TFC}</p>
            </div>
            <div className="single-item">
              <label>TFC Exp Date</label>
              <p>{item.badges.TFCExpDate}</p>
            </div>
            <div className="single-item">
              <label>ABIA</label>
              <p>{item.badges.ABIA}</p>
            </div>
            <div className="single-item">
              <label>ABIA Exp Date</label>
              <p>{item.badges.ABIAExpDate}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BadgeTab;
