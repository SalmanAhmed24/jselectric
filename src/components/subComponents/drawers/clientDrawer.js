import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { DatePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ClientDrawer({
  open,
  onClose,
  addClient,
  editClient,
  id,
  edit,
  data,
}) {
  const [customerCode, setCustomerCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [alphaCode, setAlphaCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setCusState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [balance, setBalance] = useState("");
  const [taxable, setTaxable] = useState("");
  const [status, setStatus] = useState("");
  const [customerTerm, setCustomerTerm] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [retailCertificate, setRetailCertificate] = useState("");
  const [resaleExpDate, setResaleExpDate] = useState("");
  const [salesPersonCode, setSalesPersonCode] = useState("");
  const [receiveStatements, setReceiveStatements] = useState("");
  const [financeCharge, setFinanceCharge] = useState("");
  const [retention, setRetention] = useState("");
  const [lastDateBilled, setLastDateBilled] = useState("");
  const [lastDatePaid, setLastDatePaid] = useState("");
  const [dateEstablished, setDateEstablished] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [materialLevel, setMaterialLevel] = useState("");
  const [laborLevel, setLaborLevel] = useState("");
  const [customerTypeOpt, setCustomerTypeOpt] = useState("");
  const [customerTermOpt, setCustomerTermOpt] = useState("");
  const [taxCodeOpt, setTaxCodeOpt] = useState("");
  const [salesPersonCodeOpt, setSalesPersonCodeOpt] = useState("");
  const [materialLevelOpt, setMaterialLevelOpt] = useState("");
  const [laborLevelOpt, setLaborLevelOpt] = useState("");

  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/customerType`)
      .then((res) => {
        setCustomerTypeOpt(
          res.data.customerTypes.map((i) => ({
            label: i.customerType,
            value: i.customerType,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/customerTerm`)
      .then((res) => {
        setCustomerTermOpt(
          res.data.customerTerms.map((i) => ({ label: i.days, value: i.days }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/taxCode`)
      .then((res) => {
        setTaxCodeOpt(
          res.data.taxCodes.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/salesPersonCode`)
      .then((res) => {
        setSalesPersonCodeOpt(
          res.data.salesPersonCodes.map((i) => ({
            label: i.salesPersonCode,
            value: i.salesPersonCode,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/materialLevel`)
      .then((res) => {
        setMaterialLevelOpt(
          res.data.materialLevels.map((i) => ({
            label: i.materialLevel,
            value: i.materialLevel,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/laborLevel`)
      .then((res) => {
        setLaborLevelOpt(
          res.data.laborLevels.map((i) => ({
            label: i.laborLevel,
            value: i.laborLevel,
          }))
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
      setCustomerCode(data.customerCode);
      setCustomerName(data.customerName);
      setAlphaCode(data.alphaCode);
      setAddress(data.address);
      setCity(data.city);
      setCusState(data.state);
      setZipCode(data.zipCode);
      setPhone(data.phone);
      setFax(data.fax);
      setPrimaryContact(data.primaryContact);
      setCustomerType({ label: data.customerType, value: data.customerType });
      setBalance(data.balance);
      setTaxable({ label: data.taxable, value: data.taxable });
      setStatus({ label: data.status, value: data.status });
      setCustomerTerm({ label: data.customerTerm, value: data.customerTerm });
      setTaxCode({ label: data.taxCode, value: data.taxCode });
      setRetailCertificate(data.retailCertificate);
      setResaleExpDate(data.resaleExpDate);
      setSalesPersonCode({
        label: data.salesPersonCode,
        value: data.salesPersonCode,
      });
      setReceiveStatements({
        label: data.receiveStatements,
        value: data.receiveStatements,
      });
      setFinanceCharge(data.financeCharge);
      setRetention(data.retention);
      setLastDateBilled(data.lastDateBilled);
      setLastDatePaid(data.lastDatePaid);
      setDateEstablished(data.dateEstablished);
      setCreditLimit(data.creditLimit);
      setMaterialLevel({
        label: data.materialLevel,
        value: data.materialLevel,
      });
      setLaborLevel({ label: data.laborLevel, value: data.laborLevel });
    }
  }, []);
  function validatePhoneNumber(input_str) {
    const re = /^[0-9-]+$/;
    return re.test(input_str);
  }
  const validatePhone = (phone) => {
    const flagPhone = validatePhoneNumber(phone);
    if (flagPhone) {
      setPhone(phone);
    }
  };
  const validateFax = (phone) => {
    const flagPhone = validatePhoneNumber(phone);
    if (flagPhone) {
      setFax(phone);
    }
  };
  const handleAddDevice = (e) => {
    e.preventDefault();
    const dataObj = {
      customerCode,
      customerName,
      alphaCode,
      address,
      city,
      state,
      zipCode,
      phone,
      fax,
      primaryContact,
      customerType: customerType.value,
      balance,
      taxable: taxable.value,
      status: status.value,
      customerTerm: customerTerm.value,
      taxCode: taxCode.value,
      retailCertificate,
      resaleExpDate: resaleExpDate == "undefined" ? "" : resaleExpDate,
      salesPersonCode: salesPersonCode.value,
      receiveStatements: receiveStatements.value,
      financeCharge,
      retention,
      lastDateBilled: lastDateBilled == "undefined" ? "" : lastDateBilled,
      lastDatePaid: lastDatePaid == "undefined" ? "" : lastDatePaid,
      dateEstablished: dateEstablished == "undefined" ? "" : dateEstablished,
      creditLimit,
      materialLevel: materialLevel.value,
      laborLevel: laborLevel.value,
    };
    if (edit) {
      editClient(dataObj, id);
    } else {
      addClient(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {};
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer clientDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <form onSubmit={handleAddDevice}>
          {/* <div className="input-wrap">
            <label>Category</label>
            <Select
              options={categoryOpt}
              onChange={categoryHandler}
              id="example-select-1"
              value={category}
            />
          </div> */}
          <div className="input-wrap">
            <label>Customer Code</label>
            <input
              value={customerCode}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setCustomerCode(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Customer Name</label>
            <input
              value={customerName}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Alpha Code</label>
            <input
              value={alphaCode}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setAlphaCode(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Address</label>
            <input
              value={address}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>City</label>
            <input
              value={city}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>State</label>
            <input
              value={state}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setCusState(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Zip Code</label>
            <input
              value={zipCode}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Phone No</label>
            <input
              type="text"
              value={phone}
              className={`${poppins.className} input-cus`}
              onChange={(e) => validatePhone(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Fax#</label>
            <input
              type="text"
              value={fax}
              className={`${poppins.className} input-cus`}
              onChange={(e) => validateFax(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Primary Contact</label>
            <input
              value={primaryContact}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setPrimaryContact(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Customer Type</label>
            <Select
              options={customerTypeOpt}
              onChange={(e) => setCustomerType(e)}
              value={customerType}
            />
          </div>
          <div className="input-wrap">
            <label>Balance</label>
            <input
              value={balance}
              className={`${poppins.className} input-cus`}
              type="number"
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Taxable</label>
            <Select
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              onChange={(e) => setTaxable(e)}
              value={taxable}
            />
          </div>
          <div className="input-wrap">
            <label>Status</label>
            <Select
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              onChange={(e) => setStatus(e)}
              value={status}
            />
          </div>
          <div className="input-wrap">
            <label>Customer Term</label>
            <Select
              options={customerTermOpt}
              onChange={(e) => setCustomerTerm(e)}
              value={customerTerm}
            />
          </div>
          <div className="input-wrap">
            <label>Tax Code</label>
            <Select
              options={taxCodeOpt}
              onChange={(e) => setTaxCode(e)}
              value={taxCode}
            />
          </div>
          <div className="input-wrap">
            <label>Retail Certificate</label>
            <input
              value={retailCertificate}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setRetailCertificate(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Resale Exp Date</label>
            <DatePicker
              id="datePicker-1"
              value={resaleExpDate}
              onChange={(value) => setResaleExpDate(value)}
              locale={"en-US"}
            />
            {resaleExpDate !== "" ? (
              <p onClick={() => setResaleExpDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>Salesperson Code</label>
            <Select
              options={salesPersonCodeOpt}
              onChange={(e) => setSalesPersonCode(e)}
              value={salesPersonCode}
            />
          </div>
          <div className="input-wrap">
            <label>Receive Statements</label>
            <Select
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              onChange={(e) => setReceiveStatements(e)}
              value={receiveStatements}
            />
          </div>
          <div className="input-wrap">
            <label>Finance Charge</label>
            <input
              value={financeCharge}
              className={`${poppins.className} input-cus`}
              type="number"
              onChange={(e) => setFinanceCharge(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Retention</label>
            <input
              value={retention}
              className={`${poppins.className} input-cus`}
              type="number"
              onChange={(e) => setRetention(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Last Date Billed</label>
            <DatePicker
              id="datePicker-1"
              value={lastDateBilled}
              onChange={(value) => setLastDateBilled(value)}
              locale={"en-US"}
            />
            {lastDateBilled !== "" ? (
              <p onClick={() => setLastDateBilled("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>Last Date Paid</label>
            <DatePicker
              id="datePicker-1"
              value={lastDatePaid}
              onChange={(value) => setLastDatePaid(value)}
              locale={"en-US"}
            />
            {lastDatePaid !== "" ? (
              <p onClick={() => setLastDatePaid("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>Date Established</label>
            <DatePicker
              id="datePicker-1"
              value={dateEstablished}
              onChange={(value) => setDateEstablished(value)}
              locale={"en-US"}
            />
            {dateEstablished !== "" ? (
              <p onClick={() => setDateEstablished("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>Credit Limit</label>
            <input
              value={creditLimit}
              className={`${poppins.className} input-cus`}
              type="number"
              onChange={(e) => setCreditLimit(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Material Level</label>
            <Select
              options={materialLevelOpt}
              onChange={(e) => setMaterialLevel(e)}
              value={materialLevel}
            />
          </div>
          <div className="input-wrap">
            <label>Labor Level</label>
            <Select
              options={laborLevelOpt}
              onChange={(e) => setLaborLevel(e)}
              value={laborLevel}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Client" : "Add Client"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default ClientDrawer;
