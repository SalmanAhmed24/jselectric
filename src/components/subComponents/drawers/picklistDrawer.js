import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Picklist, PicklistOption, DatePicker } from "react-rainbow-components";
import { Select } from "react-rainbow-components";

import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function PicklistDrawer({
  open,
  onClose,
  picklistName,
  addPicklist,
  editPicklist,
  id,
  edit,
  data,
}) {
  const [name, setName] = useState("");
  const [shortCode, setShortCode] = useState("");

  useEffect(() => {
    if (edit) {
      setName(data.name);
      setShortCode(data.shortCode);
    }
  }, []);

  const handleAddPicklist = (e) => {
    e.preventDefault();
    const dataObj = {
      name,
      shortCode,
    };
    if (edit) {
      editPicklist(dataObj, id);
    } else {
      addPicklist(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setName("");
    setShortCode("");
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <form onSubmit={handleAddPicklist}>
          <div className="input-wrap">
            <label>Name</label>
            <input
              value={name}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Shortcode</label>
            <input
              value={shortCode}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setShortCode(e.target.value)}
              required={true}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? `Edit ${picklistName}` : `Add ${picklistName}`}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default PicklistDrawer;
