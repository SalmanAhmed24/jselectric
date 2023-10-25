import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TopInfoTools from "../../topInfo/topInfoTools";
import PartsItems from "../../tools/parts-items";
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
              activeTab == "Parts / Items"
                ? "activeTab simpleTab"
                : "simple Tab"
            }
          >
            Parts / Items
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
        {activeTab == "Parts / Items" ? (
          <PartsItems
            parts={item.parts}
            refreshData={refreshData}
            toolId={item.id}
          />
        ) : null}
        {activeTab == "Link 3" ? <p>this is Link 3 tab</p> : null}
        {activeTab == "Link 4" ? <p>this is Link 4 tab</p> : null}
      </div>
    </Drawer>
  );
}

export default ToolsInfo;
