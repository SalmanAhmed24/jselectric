import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function AttachmentModal({ files, openFlag, closeModal }) {
  const viewPic = (file) => {
    var newTab = window.open();
    newTab.document.body.innerHTML = `<img src="data:${file.fileType};base64,${file.file}" width="auto" height="auto">`;
  };
  const viewFile = (file) => {
    let pdfWindow = window.open("");
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(file.file) +
        "'></iframe>"
    );
  };
  return (
    <Modal
      open={openFlag}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="picModal"
    >
      <div className="outer-wrap">
        <p
          onClick={closeModal}
          className={poppins.className}
          style={{ textAlign: "right", fontWeight: "600" }}
        >
          X
        </p>
        <h1 className={poppins.className}>Attachments</h1>
        <div className="inner-wrap">
          {files.map((file, ind) => {
            return (
              <div key={ind} className="image-wrap">
                {file.fileType == "image/png" ||
                file.fileType == "image/jpg" ? (
                  <img
                    src={`data:${file.fileType};base64,${file.file}`}
                    className="attach-img"
                    onClick={() => viewPic(file)}
                  />
                ) : (
                  <img
                    src={`/pdf.png`}
                    width={150}
                    height={150}
                    onClick={() => viewFile(file)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default AttachmentModal;
