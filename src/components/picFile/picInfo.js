import React, { useState, useEffect } from "react";
import "./style.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  style: ["normal"],
});
function PicInfo({ attachments }) {
  const [view, setView] = useState(false);
  return (
    <section className="attachments-wrap">
      {attachments.map((i) => {
        return (
          <section className="row">
            <div className="single-item">
              <label>Notes</label>
              <p>{i.note}</p>
            </div>
            <div className="attach-wrap">
              <label>Files/Pic</label>
              <button
                className={poppins.className}
                onClick={() => setView(!view)}
              >
                View
              </button>
              <div className="thumbmail-wrap">
                {view
                  ? i.files.map((file, ind) => {
                      return (
                        <div key={ind} className="image-wrap">
                          {file.fileType == "image/png" ||
                          file.fileType == "image/jpg" ? (
                            <img
                              src={`data:${file.fileType};base64,${file.file}`}
                              className="attach-img"
                            />
                          ) : (
                            <embed
                              name="plugin"
                              src={`data:${file.fileType};base64,${file.file}`}
                              width={150}
                              height={150}
                              type="application/pdf"
                            />
                          )}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
}

export default PicInfo;
