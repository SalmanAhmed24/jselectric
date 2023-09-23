import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Picklist, PicklistOption, DatePicker } from "react-rainbow-components";
import { Select } from "react-rainbow-components";
import TopInfoTools from "../../topInfo/topInfoTools";
import InfoTab from "../tabs/infoTab";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ToolsInfo({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Badges");
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  console.log("@@@", item);
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} info-modal`}>
        <p className="close" onClick={() => onClose()}>
          x
        </p>
        <TopInfoTools item={item} />
      </div>
      <div className={`${poppins.className} tabs-wrap`}>
        <ul className="tabs">
          <li
            onClick={tabHandler}
            className={
              activeTab == "Info" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Info
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Link 2" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Link 2
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Link 3" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Link 3
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Link 4" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Link 4
          </li>
        </ul>
      </div>
      <div className={`${poppins.className} innerTabsWrap`}>
        {activeTab == "Info" ? (
          <InfoTab item={item} closeModal={onClose} refreshData={refreshData} />
        ) : null}
        {activeTab == "Link 2" ? <p>this is Link 2 tab</p> : null}
        {activeTab == "Link 3" ? <p>this is Link 3 tab</p> : null}
        {activeTab == "Link 4" ? <p>this is Link 4 tab</p> : null}
      </div>
    </Drawer>
  );
}

export default ToolsInfo;
