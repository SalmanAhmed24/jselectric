import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function JobNumberDrawer({
  open,
  onClose,
  addJobNumber,
  editJob,
  id,
  edit,
  data,
}) {
  const [jobTag, setJobTag] = useState("");
  const [jobTagOpt, setJobTagOpt] = useState("");
  const [jobPMOpt, setJobPMOpt] = useState("");
  const [jobCTMOpt, setJobCTMOpt] = useState("");
  const [number, setNumber] = useState("");
  const [jobPM, setJobPM] = useState("");
  const [jobName, setJobName] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [dateBilled, setDateBilled] = useState("");
  const [jobCTM, setJobCTM] = useState("");
  const [amount, setAmount] = useState("");
  const [POContract, setPOContract] = useState("");
  const [changeOrder, setChangeOrder] = useState("");
  const [percentageBilled, setPercentageBilled] = useState("");
  const [notes, setNotes] = useState("");
  const [clientsOpt, setClientsOpt] = useState("");
  const [client, setClient] = useState("");
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/jobTag`)
      .then((res) => {
        setJobTagOpt(
          res.data.jobTags.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/jobPM`)
      .then((res) => {
        setJobPMOpt(
          res.data.jobPMs.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/jobCTM`)
      .then((res) => {
        setJobCTMOpt(
          res.data.jobCTMs.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setClientsOpt(
          res.data.clients.map((i) => ({
            label: i.customerName,
            value: i.customerName,
          }))
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
      setClient({ label: data.client, value: data.client });
      setJobTag({ label: data.jobTag, value: data.jobTag });
      setNumber(data.number);
      setJobPM({ label: data.jobPM, value: data.jobPM });
      setJobName(data.jobName);
      setDateCreated(new Date(data.dateCreated));
      setDateBilled(new Date(data.dateBilled));
      setJobCTM({ label: data.jobCTM, value: data.jobCTM });
      setPOContract(data.POContract);
      setChangeOrder(data.changeOrder);
      setPercentageBilled(data.percentageBilled);
      setNotes(data.notes);
      setAmount(data.amount);
    }
  }, []);

  const handleaddJob = (e) => {
    e.preventDefault();
    const dataObj = {
      jobTag: jobTag.value,
      number,
      jobPM: jobPM.value,
      jobName,
      client: client.value,
      dateCreated,
      dateBilled,
      jobCTM: jobCTM.value,
      amount,
      POContract,
      changeOrder,
      percentageBilled,
      notes,
    };
    if (edit) {
      editJob(dataObj, id);
    } else {
      addJobNumber(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setJobTag("");
    setAmount("");
    setChangeOrder("");
    setDateBilled("");
    setNumber("");
    setJobName("");
    setPOContract("");
    setPercentageBilled("");
    setNotes("");
    setJobCTM("");
    setJobPM("");
    setDateCreated("");
    setClient("");
  };
  const jobTagHandler = (e) => setJobTag(e);
  const jobPMHandler = (e) => setJobPM(e);
  const jobCTMHandler = (e) => setJobCTM(e);
  const clientHandler = (e) => setClient(e);
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <p className="close-modal" onClick={onClose}>
          &#10005;
        </p>
        <form onSubmit={handleaddJob}>
          <div className="input-wrap">
            <label>Job Tag</label>
            <Select
              options={jobTagOpt}
              onChange={jobTagHandler}
              id="example-select-1"
              value={jobTag}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Number</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Job PM</label>
            <Select
              options={jobPMOpt}
              onChange={jobPMHandler}
              id="example-select-1"
              value={jobPM}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Job Name</label>
            <input
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Client</label>
            <Select
              options={clientsOpt}
              onChange={clientHandler}
              id="example-select-1"
              value={client}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Date Created</label>
            <DatePicker
              selected={dateCreated}
              onChange={(date) => setDateCreated(date)}
            />
            {dateCreated == "" ? null : (
              <p onClick={() => setDateCreated("")}>Clear</p>
            )}
          </div>
          <div className="input-wrap">
            <label>Date Billed</label>
            <DatePicker
              selected={dateBilled}
              onChange={(date) => setDateBilled(date)}
            />
            {dateBilled == "" ? null : (
              <p onClick={() => setDateBilled("")}>Clear</p>
            )}
          </div>
          <div className="input-wrap">
            <label>Job CTM</label>
            <Select
              options={jobCTMOpt}
              onChange={jobCTMHandler}
              id="example-select-1"
              value={jobCTM}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Amount</label>
            <input
              placeholder="$"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>PO Contract</label>
            <input
              type="text"
              value={POContract}
              onChange={(e) => setPOContract(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Change Order</label>
            <input
              type="text"
              value={changeOrder}
              onChange={(e) => setChangeOrder(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Percentage Billed</label>
            <input
              placeholder="%"
              type="number"
              value={percentageBilled}
              onChange={(e) => setPercentageBilled(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Job" : "Add Job"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default JobNumberDrawer;
