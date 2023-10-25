import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

function PartsItemsForm({ addParts, editFlag, data }) {
  const [partNo, setPartNo] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (editFlag) {
      setPartNo(data.partNo);
      setDescription(data.description);
    }
  }, []);
  const handleParts = () => {
    const dataObj = {
      partNo,
      description,
    };
    addParts(dataObj);
  };
  return (
    <section>
      <form className="parts-form" onSubmit={handleParts}>
        <div className="input-wrap">
          <label>Part No</label>
          <input
            className={`${poppins.className} input`}
            onChange={(e) => setPartNo(e.target.value)}
            value={partNo}
          />
        </div>
        <div className="input-wrap">
          <label>Description</label>
          <input
            className={`${poppins.className} input`}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="input-wrap">
          <input
            className={`${poppins.className} sub-Btn`}
            type="submit"
            value={editFlag ? "Edit" : "Add"}
          />
        </div>
      </form>
    </section>
  );
}

export default PartsItemsForm;
