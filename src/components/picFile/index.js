import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { useSelector } from "react-redux";

import moment from "moment";
import axios from "axios";
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
function PicFile({ userId }) {
  const [fileUpload, setFileUpload] = useState([]);
  const [note, setNote] = useState("");
  const currentUser = useSelector((state) => state.user);
  const handleFilesData = (e) => {
    e.preventDefault();
    console.log("files", fileUpload);
    const formData = new FormData();
    formData.append("date", moment(new Date()).format("MM-DD-YYYY"));
    formData.append("time", moment(new Date()).format("hh:mm A"));
    formData.append("note", note);
    formData.append("user", currentUser.user.userInfo.fullname);
    formData.append("files", fileUpload);
    // const data = {
    //   date: moment(new Date()).format("MM-DD-YYYY"),
    //   time: moment(new Date()).format("hh:mm A"),
    //   note,
    //   files: [...fileUpload],
    //   user: currentUser.user.userInfo.fullname,
    // };
    axios({
      method: "patch",
      url: `http://localhost:9000/api/users/addFiles/${userId}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const fileHandler = (e) => {
    setFileUpload(e.target.files[0]);
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const dataObj = {
        file: reader.result,
        fileType: file.type,
      };
      setFileUpload((state) => [dataObj, ...state]);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  return (
    <section>
      <form
        className="file-form"
        onSubmit={handleFilesData}
        encType="multipart/form-data"
      >
        <div className="input-wrap">
          <label>Files</label>
          <input
            type="file"
            className={`${poppins.className} single-inp`}
            onChange={fileHandler}
            multiple
            name="files"
          />
        </div>
        <div className="input-wrap">
          <label>Notes</label>
          <input
            type="text"
            className={`${poppins.className}`}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="input-wrap">
          <input
            className={`${poppins.className} submit-btn`}
            type="submit"
            value="Add"
          />
        </div>
      </form>
      <p className={poppins.className} style={{ marginTop: 30 }}>
        There are no Pictures / Files not found
      </p>
    </section>
  );
}

export default PicFile;
