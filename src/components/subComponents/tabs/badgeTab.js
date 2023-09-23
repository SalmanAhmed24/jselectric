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
import moment from "moment";
function BadgeTab({ item, refreshData, closeModal }) {
  const [editFlag, setEditFlag] = useState(false);
  const addBadgeHandler = (data, editFlag) => {
    let url;
    if (editFlag) {
      url = `${apiPath.prodPath}/api/users/editBadges/${item.id}`;
    } else {
      url = `${apiPath.prodPath}/api/users/addBadges/${item.id}`;
    }
    axios
      .patch(url, data)
      .then((res) => {
        refreshData();
        closeModal();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="badges-tab">
      <AddBadge
        editFlag={item.badges == undefined ? false : true}
        dataToBeEdited={item.badges == undefined ? "" : item.badges}
        addBadgeFunc={addBadgeHandler}
      />
      <div className="content-bottom-main">
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
              <p>{moment(item.badges.AISDExpDate).format("MM-DD-YY")}</p>
            </div>
            <div className="single-item">
              <label>COA Water Dep</label>
              <p>{item.badges.COAWaterDep}</p>
            </div>
            <div className="single-item">
              <label>COA Water Dept Exp Date</label>
              <p>{moment(item.badges.COAWaterDepExpDate).format("MM-DD-YY")}</p>
            </div>
            <div className="single-item">
              <label>TFC</label>
              <p>{item.badges.TFC}</p>
            </div>
            <div className="single-item">
              <label>TFC Exp Date</label>
              <p>{moment(item.badges.TFCExpDate).format("MM-DD-YY")}</p>
            </div>
            <div className="single-item">
              <label>ABIA</label>
              <p>{item.badges.ABIA}</p>
            </div>
            <div className="single-item">
              <label>ABIA Exp Date</label>
              <p>{moment(item.badges.ABIAExpDate).format("MM-DD-YY")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BadgeTab;
