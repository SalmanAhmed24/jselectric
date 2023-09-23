import axios from "axios";
import "./style.scss";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { apiPath } from "@/utils/routes";
function AddInfo({ poppins, toolId, editFlag, dataToBeEdited, addInfoFunc }) {
  const [subCatOpt, setSubCatOpt] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [empOpt, setEmpOpt] = useState("");
  const [employee, setEmployee] = useState("");
  const [project, setProject] = useState("");
  const [lastPurchasePrice, setLastPurchasePrice] = useState("");
  const [pictureUpload, setPictureUpload] = useState("");
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/subtoolCategory/`)
      .then((res) => {
        console.log(res.data.subtoolCategorys);
        const data =
          res.data &&
          res.data.subtoolCategorys &&
          res.data.subtoolCategorys.map((i) => ({
            label: i.name,
            value: i.name,
          }));
        setSubCatOpt(data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setEmpOpt(
          res.data.allUsers
            .filter((i) => i.userType == "foreman")
            .map((i) => ({
              label: i.fullname,
              value: i.fullname,
            }))
        );
      })
      .catch((err) => console.log(err));
    if (editFlag) {
      setSubCategory({
        label: dataToBeEdited.subCategory,
        value: dataToBeEdited.subCategory,
      });
      setEmployee({
        label: dataToBeEdited.employee,
        value: dataToBeEdited.employee,
      });
      setLastPurchasePrice(dataToBeEdited.lastPurchasePrice);
      setProject(dataToBeEdited.project);
      setPictureUpload(dataToBeEdited.picture);
    }
  }, [editFlag]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subCategory", subCategory.value);
    formData.append("project", project);
    formData.append("employee", employee.value);
    formData.append("lastPurchasePrice", lastPurchasePrice);
    formData.append("picture", pictureUpload);
    addInfoFunc(formData, false, toolId);
  };
  const handleSubCat = (e) => {
    setSubCategory(e);
  };
  const handleEmp = (e) => {
    setEmployee(e);
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
  return (
    <section className="main-wrap">
      <form
        className={`${poppins.className} input-wraps`}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="single-inp">
          <label>Sub Category</label>
          <Select
            options={subCatOpt}
            onChange={handleSubCat}
            value={subCategory}
          />
        </div>
        <div className="single-inp">
          <label>Employee</label>
          <Select options={empOpt} onChange={handleEmp} value={employee} />
        </div>
        <div className="single-inp">
          <label>Projects</label>
          <input
            type="text"
            onChange={(e) => setProject(e.target.value)}
            value={project}
          />
        </div>
        <div className="single-inp">
          <label>Last Purchase Price</label>
          <input
            type="number"
            onChange={(e) => setLastPurchasePrice(e.target.value)}
            value={lastPurchasePrice}
          />
        </div>
        <div className="single-inp">
          <label>Picture</label>
          <input
            type="file"
            onChange={handleUpload}
            accept="image/png,image/jpeg"
          />
          {editFlag ? (
            <img src={pictureUpload} style={{ width: "30%" }} />
          ) : (
            <img src={pictureUpload} width={100} height={100} />
          )}
        </div>
        <div className="single-inp">
          <input className="save-btn" type="submit" value="save" />
        </div>
      </form>
    </section>
  );
}

export default AddInfo;
