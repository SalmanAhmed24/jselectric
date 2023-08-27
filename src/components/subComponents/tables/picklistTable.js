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
import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
import PicklistDrawer from "../drawers/picklistDrawer";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function PicklistTable({
  picklistData,
  picklistName,
  loading,
  refreshData,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [picklistId, setpicklistId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const handleActions = (id) => {
    setpicklistId(id);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenModal(!openModal);
  };
  const editEmp = (data, id) => {
    let apiUrl;
    if (picklistName == "User Type") {
      apiUrl = `${apiPath.prodPath}/api/userType/${id}`;
    }
    if (picklistName == "Position") {
      apiUrl = `${apiPath.prodPath}/api/position/${id}`;
    }
    axios
      .patch(apiUrl, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteEmp = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the employee data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        let apiUrl;
        if (picklistName == "User Type") {
          apiUrl = `${apiPath.prodPath}/api/userType/${id}`;
        }
        if (picklistName == "Position") {
          apiUrl = `${apiPath.prodPath}/api/position/${id}`;
        }
        axios
          .delete(apiUrl)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Shortcode</TableCell>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {picklistData.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No {picklistName} Found</p>
                </TableRow>
              ) : (
                picklistData.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell>{i.name}</TableCell>
                      <TableCell>{i.shortCode}</TableCell>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id)}
                          src="/dots.png"
                          width={32}
                          height={32}
                        />
                        {actionFlag && i.id == picklistId ? (
                          <div className="dropdown-div">
                            {/* <p className={poppins.className}>Info Modal</p> */}
                            <p
                              onClick={() => openEmpModal({ ...i })}
                              className={poppins.className}
                            >
                              Edit
                            </p>
                            <p
                              onClick={() => deleteEmp(i.id)}
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
              <PicklistDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={picklistId}
                data={editData}
                picklistName={picklistName}
                editPicklist={editEmp}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
