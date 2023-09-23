import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Picklist, PicklistOption, DatePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ToolsDrawer({ open, onClose, addTool, editTool, id, edit, data }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [techAssigned, setTechAssigned] = useState("");
  const [location, setLocation] = useState("");
  const [categoryOpt, setCategoryOpt] = useState("");
  const [techAssignOpt, setTechAssignOpt] = useState("");
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/toolCategory/`)
      .then((res) => {
        setCategoryOpt(
          res.data.toolCategory.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setTechAssignOpt(
          res.data.allUsers
            .filter((i) => i.userType == "foreman")
            .map((i) => ({
              label: i.fullname,
              value: i.fullname,
            }))
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
      console.log(data.description);
      setCategory({ label: data.category, value: data.category });
      setDescription(data.description);
      setTechAssigned({ label: data.techAssigned, value: data.techAssigned });
      setLocation(data.location);
    }
  }, []);

  const handleAddTool = (e) => {
    e.preventDefault();
    const dataObj = {
      category: category.value,
      description,
      techAssigned: techAssigned.value,
      location,
    };
    if (edit) {
      editTool(dataObj, id);
    } else {
      addTool(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setCategory("");
    setDescription("");
    setTechAssigned("");
    setLocation("");
  };
  const categoryHandler = (e) => {
    console.log(e);
    setCategory(e);
  };
  const techAssignedHandler = (e) => {
    console.log(e);
    setTechAssigned(e);
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <form onSubmit={handleAddTool}>
          <div className="input-wrap">
            <label>Category</label>
            <Select
              options={categoryOpt}
              onChange={categoryHandler}
              id="example-select-1"
              value={category}
            />
          </div>
          <div className="input-wrap">
            <label>Description</label>
            <input
              value={description}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Tech Assigned</label>
            <Select
              options={techAssignOpt}
              onChange={techAssignedHandler}
              id="example-select-1"
              value={techAssigned}
            />
          </div>
          <div className="input-wrap">
            <label>Location</label>
            <input
              value={location}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Tools" : "Add Tools"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default ToolsDrawer;
