import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import ClientTable from "../subComponents/tables/clientTable";
import ClientsDrawer from "../subComponents/drawers/clientDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
function Clients() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allClients, setAllClients] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(res.data.clients);
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
  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    if (search == "") {
      return false;
    }
    axios
      .get(`${apiPath.prodPath}/api/clients/${search}`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const addClient = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/clients/addClient`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className="client-wrap">
      <section className="inner-client">
        <div className="add-btn-wrap">
          <button onClick={() => setDrawer(true)} className={poppins.className}>
            Add Client
          </button>
        </div>
        <div className="search-wrap">
          <form onSubmit={handleSearch}>
            <input
              className={poppins.className}
              type="text"
              placeholder="Search by Name"
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
        <section className="table-wrap">
          <ClientTable
            refreshData={refreshData}
            allClients={allClients}
            loading={false}
          />
        </section>
      </section>
      <ClientsDrawer
        addClient={addClient}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Clients;
