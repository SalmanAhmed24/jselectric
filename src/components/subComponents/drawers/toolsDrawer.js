import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Picklist, PicklistOption, DatePicker } from "react-rainbow-components";
import "./style.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

function ToolsDrawer({ open, onClose, addTool, editTool, id, edit, data }) {
  const currentUser = useSelector((state) => state.user.user);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [techAssigned, setTechAssigned] = useState("");
  const [location, setLocation] = useState("");
  const [categoryOpt, setCategoryOpt] = useState("");
  // const [allSubCatOpt, setAllSubCatOpt] = useState("");
  const [techAssignOpt, setTechAssignOpt] = useState("");
  const [subCatOpt, setSubCatOpt] = useState("");
  const [filteredCatOpt, setFilteredCatOpt] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [employee, setEmployee] = useState({
    label: currentUser && currentUser.userInfo && currentUser.userInfo.fullname,
    value: currentUser && currentUser.userInfo && currentUser.userInfo.fullname,
  });
  const [project, setProject] = useState("");
  const [lastPurchasePrice, setLastPurchasePrice] = useState("");
  const [pictureUpload, setPictureUpload] = useState("");
  const [toolNumber, setToolNumber] = useState("");
  const [serial, setSerial] = useState("");
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
      .get(`${apiPath.prodPath}/api/subtoolCategory/`)
      .then((res) => {
        const data =
          res.data &&
          res.data.subtoolCategorys &&
          res.data.subtoolCategorys.map((i) => ({
            label: i.name,
            value: i.name,
            parentCategory: i.parentCategory,
          }));
        setSubCatOpt(data);
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
      setCategory({ label: data.category, value: data.category });
      setDescription(data.description);
      setTechAssigned({ label: data.techAssigned, value: data.techAssigned });
      setLocation(data.location);
      setSubCategory({ label: data.subCategory, value: data.subCategory });
      setEmployee({ label: data.employee, value: data.employee });
      setProject(data.project);
      setPictureUpload(data.picture);
      setToolNumber(data.toolNumber);
      setSerial(data.serial);
      setLastPurchasePrice(data.lastPurchasePrice);
    }
  }, []);

  const handleAddTool = (e) => {
    e.preventDefault();
    const dataObj = {
      toolNumber,
      category: category.value,
      description,
      techAssigned: techAssigned.value,
      location,
      subCategory: subCategory.value,
      employee: employee.value,
      project,
      lastPurchasePrice,
      picture: pictureUpload,
      serial,
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
    setEmployee("");
    setLastPurchasePrice("");
    setSubCategory("");
    setPictureUpload("");
    setToolNumber("");
    setProject("");
    setSerial("");
  };
  const categoryHandler = (e) => {
    setSubCategory("");
    setCategory(e);

    let filteredSubOpt;
    if (e.value == "Ladder") {
      filteredSubOpt = subCatOpt.filter((i) => i.parentCategory == "ladder");
    } else {
      filteredSubOpt = subCatOpt.filter((i) => i.parentCategory == e.value);
    }
    setFilteredCatOpt(filteredSubOpt);
  };
  const techAssignedHandler = (e) => {
    setTechAssigned(e);
  };
  const handleUpload = (e) => {
    getBase64(e.target.files[0]);
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPictureUpload(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const handleDigitCheck = (e) => {
    if (e.target.value.length <= 6) {
      setToolNumber(e.target.value);
    }
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
            <label>Tool #</label>
            <input
              value={toolNumber}
              className={`${poppins.className} input-cus`}
              type="number"
              onChange={handleDigitCheck}
            />
          </div>
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
            <label>Sub Category</label>
            <Select
              options={filteredCatOpt}
              onChange={(e) => setSubCategory(e)}
              value={subCategory}
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
          <div className="input-wrap">
            <label>Employee</label>
            <Select
              options={techAssignOpt}
              onChange={(e) => setEmployee(e)}
              value={employee}
              isDisabled={true}
            />
          </div>
          <div className="input-wrap">
            <label>Projects</label>
            <input
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setProject(e.target.value)}
              value={project}
            />
          </div>
          <div className="input-wrap">
            <label>Serial #</label>
            <input
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setSerial(e.target.value)}
              value={serial}
            />
          </div>
          <div className="input-wrap">
            <label>Last Purchase Price</label>
            <input
              className={`${poppins.className} input-cus`}
              type="number"
              onChange={(e) => setLastPurchasePrice(e.target.value)}
              value={lastPurchasePrice}
            />
          </div>
          <div className="input-wrap">
            <label>Picture</label>
            <input
              className={`${poppins.className} input-cus`}
              type="file"
              onChange={handleUpload}
              accept="image/png,image/jpeg"
            />
            <img src={pictureUpload} style={{ width: "30%" }} />
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
