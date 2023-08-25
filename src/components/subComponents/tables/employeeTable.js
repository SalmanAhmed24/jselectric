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
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function EmployeeTable({ allUsers, loading }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [empId, setEmpId] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleActions = (id) => {
    console.log("emp id", id);
    setEmpId(id);
    setActionFlag(true);
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
                <TableCell style={{ minWidth: 150 }}>Full name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Position</TableCell>
                <TableCell style={{ minWidth: 150 }}>Personal Phone</TableCell>
                <TableCell style={{ minWidth: 150 }}>Company Phone</TableCell>
                <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                <TableCell style={{ minWidth: 150 }}>Vehicle</TableCell>
                <TableCell style={{ minWidth: 150 }}>Tablet</TableCell>
                <TableCell style={{ minWidth: 150 }}>City</TableCell>
                <TableCell style={{ minWidth: 150, position: "relative" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Employee Data Found</p>
                </TableRow>
              ) : (
                allUsers.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell>{i.fullname}</TableCell>
                      <TableCell>{i.position}</TableCell>
                      <TableCell>{i.personalPhone}</TableCell>
                      <TableCell>{i.companyPhone}</TableCell>
                      <TableCell>{i.email}</TableCell>
                      <TableCell>{i.vehicle}</TableCell>
                      <TableCell>{i.tablet}</TableCell>
                      <TableCell>{i.city}</TableCell>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id)}
                          src="/dots.png"
                          width={32}
                          height={32}
                        />
                        {actionFlag && i.id == empId ? (
                          <div className="dropdown-div">
                            <p className={poppins.className}>Info Modal</p>
                            <p className={poppins.className}>Edit</p>
                            <p className={poppins.className}>Delete</p>
                          </div>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={5}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
