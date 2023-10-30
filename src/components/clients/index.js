import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import ClientTable from "../subComponents/tables/clientTable";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
function Clients() {
  return (
    <section className="client-wrap">
      <section className="inner-client">
        <div className="add-btn-wrap">
          <button className={poppins.className}>Add Client</button>
        </div>
        <section className="table-wrap">
          <ClientTable allClients={[]} loading={false} />
        </section>
      </section>
    </section>
  );
}

export default Clients;
