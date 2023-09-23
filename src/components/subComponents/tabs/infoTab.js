import React, { useState, useEffect } from "react";
import "./style.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import AddInfo from "../forms/addInfo";
import axios from "axios";
import { apiPath } from "@/utils/routes";

function InfoTab({ item, refreshData, closeModal }) {
  const [show, setShow] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [dataToBeEdited, setDataToBeEdited] = useState();
  const showFields = () => {
    setShow(!show);
  };
  const addInfoHandler = (data, editFlag, id) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    let url;
    if (editFlag) {
      url = `${apiPath.prodPath}/api/users/editInfo/${id}`;
    } else {
      url = `${apiPath.prodPath}/api/tools/addInfo/${id}`;
    }
    axios
      .patch(url, data, config)
      .then((res) => {
        refreshData();
        closeModal();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="badges-tab">
      {show ? (
        <AddInfo
          editFlag={editFlag}
          dataToBeEdited={dataToBeEdited}
          addInfoFunc={addInfoHandler}
          poppins={poppins}
          toolId={item.id}
        />
      ) : null}
      <div className="main-wrap">
        {item.info == undefined ? (
          <button className={poppins.className} onClick={showFields}>
            Add Info
          </button>
        ) : (
          <button
            onClick={() => {
              setDataToBeEdited(item.info);
              setEditFlag(true);
              setShow(true);
            }}
            className={poppins.className}
          >
            Edit Info
          </button>
        )}
      </div>
      <div>
        {item.info == undefined ? (
          <p>No data for Info found</p>
        ) : (
          <div className="badgeInfo-data">
            <div className="single-item">
              <label>Sub Category</label>
              <p>{item.info.subCategory}</p>
            </div>
            <div className="single-item">
              <label>Employee</label>
              <p>{item.info.employee}</p>
            </div>
            <div className="single-item">
              <label>Project</label>
              <p>{item.info.project}</p>
            </div>
            <div className="single-item">
              <label>lastPurchasePrice</label>
              <p>{item.info.lastPurchasePrice}</p>
            </div>
            <div className="single-item picture-wrap">
              <label>Picture</label>
              <img src={item.info.picture} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoTab;
