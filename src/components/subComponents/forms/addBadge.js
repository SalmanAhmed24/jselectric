import "./style.scss";
import React, { useState, useEffect } from "react";
import { Select, DatePicker } from "react-rainbow-components";
import { Poppins } from "next/font/google";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function AddBadge({ addBadgeFunc, editFlag, dataToBeEdited }) {
  const [AISD, setAISD] = useState();
  const [AISDExpDate, setAISDExpDate] = useState(new Date());
  const [COAWaterDep, setCOAWaterDep] = useState();
  const [COAWaterDepExpDate, setCOAWaterDepExpDate] = useState(new Date());
  const [TFC, setTFC] = useState();
  const [TFCExpDate, setTFCExpDate] = useState(new Date());
  const [ABIA, setABIA] = useState();
  const [ABIAExpDate, setABIAExpDate] = useState(new Date());
  const dropdownOpt = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  useState(() => {
    if (editFlag) {
      setAISD(dataToBeEdited.AISD);
      setAISDExpDate(dataToBeEdited.AISDExpDate);
      setCOAWaterDep(dataToBeEdited.COAWaterDep);
      setCOAWaterDepExpDate(dataToBeEdited.COAWaterDepExpDate);
      setTFC(dataToBeEdited.TFC);
      setTFCExpDate(dataToBeEdited.TFCExpDate);
      setABIA(dataToBeEdited.ABIA);
      setABIAExpDate(dataToBeEdited.ABIAExpDate);
    }
  }, [editFlag]);
  const addBadge = () => {
    const data = {
      AISD,
      AISDExpDate,
      COAWaterDep,
      COAWaterDepExpDate,
      TFC,
      TFCExpDate,
      ABIA,
      ABIAExpDate,
    };
    console.log("this is addBadge", data);
    addBadgeFunc(data, editFlag);
  };
  return (
    <div className={`input-wraps`}>
      <div className="single-inp">
        <label>AISD</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setAISD(e.target.value)}
          id="example-select-1"
          value={AISD}
        />
      </div>
      <div className="single-inp">
        <label>AISD Exp Date</label>
        <DatePicker
          id="datePicker-1"
          value={AISDExpDate}
          onChange={(value) => setAISDExpDate(value)}
          locale={"en-US"}
        />
      </div>
      <div className="single-inp">
        <label>COA Water Dept</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setCOAWaterDep(e.target.value)}
          id="example-select-2"
          value={COAWaterDep}
        />
      </div>
      <div className="single-inp">
        <label>COA Water Exp Date</label>
        <DatePicker
          id="datePicker-1"
          value={COAWaterDepExpDate}
          onChange={(value) => setCOAWaterDepExpDate(value)}
          locale={"en-US"}
        />
      </div>
      <div className="single-inp">
        <label>TFC</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setTFC(e.target.value)}
          id="example-select-3"
          value={TFC}
        />
      </div>
      <div className="single-inp">
        <label>TFC Exp Date</label>
        <DatePicker
          id="datePicker-1"
          value={TFCExpDate}
          onChange={(value) => setTFCExpDate(value)}
          locale={"en-US"}
        />
      </div>
      <div className="single-inp">
        <label>ABIA</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setABIA(e.target.value)}
          id="example-select-5"
          value={ABIA}
        />
      </div>
      <div className="single-inp">
        <label>ABIA Exp Date</label>
        <DatePicker
          id="datePicker-1"
          value={ABIAExpDate}
          onChange={(value) => setABIAExpDate(value)}
          locale={"en-US"}
        />
      </div>
      <div className="single-inp">
        <button onClick={addBadge}>Save</button>
      </div>
    </div>
  );
}

export default AddBadge;
