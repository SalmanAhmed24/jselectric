import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./table.scss";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import ToolDamagedDrawer from "../drawers/toolDamagedDrawer";
function ToolDamagedTable({ allToolDamaged, refreshData, userInfo }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openFlag, setOpenFlag] = useState(false);
  const [editData, setEditData] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenFlag(!openFlag);
  };
  const deletetoolDamaged = (id) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${apiPath.prodPath}/api/toolDamage/${id}`).then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Unable to delete",
            });
          }
          if (res.data.error == false) {
            Swal.fire({
              icon: "success",
              text: "Deleted Successfully",
            });
            refreshData();
          }
        });
      }
    });
  };
  return (
    <section>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Current Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Tool #</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Serial</TableCell>
              <TableCell>Picture</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allToolDamaged
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell>
                      <div className="action-wrap">
                        <span
                          onClick={() => {
                            deletetoolDamaged(row.id);
                          }}
                        >
                          &#10005;
                        </span>
                        <span
                          onClick={() => {
                            openEmpModal(row);
                          }}
                        >
                          &#9998;
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {moment(row.currentDate).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell>{row.toolNumber}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.subCategory}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.serial}</TableCell>
                    <TableCell>
                      {row.picture && row.picture !== undefined ? (
                        <img
                          src={`${row.picture.fileUrl}`}
                          style={{ width: 100 }}
                        />
                      ) : (
                        "None"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={allToolDamaged.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ToolDamagedDrawer
        open={openFlag}
        user={userInfo}
        onClose={() => setOpenFlag(!openFlag)}
        refreshData={refreshData}
        edit={true}
        editData={editData}
      />
    </section>
  );
}

export default ToolDamagedTable;
