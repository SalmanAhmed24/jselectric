import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Picklist, PicklistOption, DatePicker } from "react-rainbow-components";
import Select from "react-select";

import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
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
  const [parentCategoryOpt, setParentCategoryOpt] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  useEffect(() => {
    if (picklistName == "Tool Sub-Category") {
      axios
        .get(`${apiPath.prodPath}/api/toolCategory`)
        .then((res) => {
          if (res.data && res.data.toolCategory)
            setParentCategoryOpt(
              res.data.toolCategory.map((i) => ({
                label: i.name,
                value: i.name,
              }))
            );
        })
        .catch((err) => console.log(err));
    }
    if (edit) {
      if (picklistName == "Tool Sub-Category") {
        setName(data.name);
        setParentCategory({
          label: data.parentCategory,
          value: data.parentCategory,
        });
      } else {
        setName(data.name);
        setShortCode(data.shortCode);
      }
    }
  }, []);

  const handleAddPicklist = (e) => {
    e.preventDefault();
    let dataObj;
    if (picklistName == "Tool Sub-Category") {
      dataObj = {
        name,
        parentCategory: parentCategory.value,
      };
    } else {
      dataObj = {
        name,
        shortCode,
      };
    }
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
          {picklistName == "Tool Sub-Category" ? (
            <div className="input-wrap">
              <label>Parent Category</label>
              <Select
                value={parentCategory}
                className={`${poppins.className}`}
                onChange={(e) => setParentCategory(e)}
                required={true}
                options={parentCategoryOpt}
              />
            </div>
          ) : (
            <div className="input-wrap">
              <label>Shortcode</label>
              <input
                value={shortCode}
                className={`${poppins.className} input-cus`}
                onChange={(e) => setShortCode(e.target.value)}
                required={true}
              />
            </div>
          )}
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
