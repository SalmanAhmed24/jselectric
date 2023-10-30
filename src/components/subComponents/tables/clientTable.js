import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
// import DeviceDrawer from "../drawers/deviceDrawer";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function DeviceTable({ allClients, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [clientId, setClientId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();

  const handleActions = (id, objData) => {
    setDeviceId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenModal(!openModal);
  };
  const openInfoDrawer = () => {
    if (infoModal) {
      setActionFlag(false);
    }
    setInfoModal(!infoModal);
  };
  const editDevice = (data, id) => {
    // axios
    //   .patch(`${apiPath.prodPath}/api/devices/${id}`, data)
    //   .then((res) => {
    //     refreshData();
    //     openEmpModal();
    //     setActionFlag(false);
    //   })
    //   .catch((err) => console.log(err));
  };
  const deleteDevices = (id) => {
    // Swal.fire({
    //   icon: "warning",
    //   title: "Are You Sure?",
    //   text: "Are you sure you want to delete the devices data? This action is irreversible.",
    //   confirmButtonText: "Delete",
    //   cancelButtonText: "Cancel",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     axios
    //       .delete(`${apiPath.prodPath}/api/devices/${id}`)
    //       .then((res) => {
    //         refreshData();
    //         openEmpModal();
    //         setActionFlag(false);
    //       })
    //       .catch((err) => console.log(err));
    //   }
    // });
  };
  const sortedClients = allClients.sort((a, b) =>
    a.category.localeCompare(b.category)
  );
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ minHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Customer Code</TableCell>
                <TableCell style={{ minWidth: 150 }}>Customer Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Customer Type</TableCell>
                <TableCell style={{ minWidth: 150 }}>Alpha Code</TableCell>
                <TableCell style={{ minWidth: 120 }}>Address</TableCell>
                <TableCell style={{ minWidth: 120 }}>City</TableCell>
                <TableCell style={{ minWidth: 120 }}>State</TableCell>
                <TableCell style={{ minWidth: 150 }}>Zip Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedClients.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Devices Data Found</p>
                </TableRow>
              ) : (
                sortedClients.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                        />
                        {actionFlag && i.id == deviceId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={() => openEmpModal({ ...i })}
                              className={poppins.className}
                            >
                              Edit
                            </p>
                            <p
                              onClick={() => deleteDevices(i.id)}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {openModal && editData ? (
              <DeviceDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={deviceId}
                data={editData}
                editDevice={editDevice}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
