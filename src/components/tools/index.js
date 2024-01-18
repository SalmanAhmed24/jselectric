"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import ToolsTable from "../subComponents/tables/toolsTable";
import ToolsDrawer from "../subComponents/drawers/toolsDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Tools() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTools, setAllTools] = useState([]);
  const [search, setSearch] = useState("");
  const [searchOpt, setSearchOpt] = useState({
    label: "Tool No",
    value: "toolNo",
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(res.data.allTools);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addTool = (data, cb = null) => {
    axios
      .post(`${apiPath.prodPath}/api/tools/addTools`, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: `${res.data.message}`,
          });
        } else {
          handleCloseDrawer();
          refreshData();
          cb();
        }
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(res.data.allTools);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    if (search == "") {
      return false;
    }
    axios
      .get(`${apiPath.prodPath}/api/tools/${search}&&${searchOpt.value}`)
      .then((res) => {
        setAllTools(res.data.allTools);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(res.data.allTools);
        setLoading(false);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Tools</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Tools
        </button>
      </div>
      <div className="search-opt">
        <Select
          className={poppins.className}
          value={searchOpt}
          options={[
            { label: "Serial No", value: "serialNo" },
            { label: "Tool No", value: "toolNo" },
          ]}
          onChange={(value) => {
            setSearchOpt(value);
            setSearch("");
          }}
        />
      </div>
      {searchOpt.value == "toolNo" ? (
        <div className="search-wrap">
          <form onSubmit={handleSearch}>
            <input
              className={poppins.className}
              type="text"
              placeholder="Search by Tool#"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className={`${poppins.className} search-btn`}
              type="submit"
              value={"Search"}
            />
            {search == "" ? null : (
              <p
                onClick={handleClear}
                className={`${poppins.className} clear-btn`}
                style={{ color: "red" }}
              >
                Clear
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="search-wrap">
          <form onSubmit={handleSearch}>
            <input
              className={poppins.className}
              type="text"
              placeholder="Search by Serial #"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className={`${poppins.className} search-btn`}
              type="submit"
              value={"Search"}
            />
            {search == "" ? null : (
              <p
                onClick={handleClear}
                className={`${poppins.className} clear-btn`}
                style={{ color: "red" }}
              >
                Clear
              </p>
            )}
          </form>
        </div>
      )}
      <div className="table-wrap">
        <ToolsTable
          loading={loading}
          allTools={allTools}
          refreshData={refreshData}
        />
      </div>
      <ToolsDrawer
        addTool={addTool}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Tools;
