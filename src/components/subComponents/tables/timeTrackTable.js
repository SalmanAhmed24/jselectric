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
import moment from "moment";
import "./table.scss";
function TimeTrackTable({ allTimeTrack, loading, deleteData, handleEdit }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openFlag, setOpenFlag] = useState(false);
  const [history, setHistory] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  return loading ? (
    <p className={poppins.className}>Loading...</p>
  ) : (
    <section>
      <TableContainer className={poppins.className} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell style={{ minWidth: 150 }}>Employee</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Phase</TableCell>
              <TableCell style={{ minWidth: 100 }}>Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>Timings</TableCell>
              <TableCell>Lunch</TableCell>
              <TableCell style={{ minWidth: 150 }}>Lunch Timings</TableCell>
              <TableCell>Spectrum</TableCell>
              <TableCell style={{ minWidth: 150 }}>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTimeTrack &&
              allTimeTrack
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>
                        <div className="action-wrap">
                          <span onClick={() => handleEdit(row)}>&#9998;</span>
                        </div>
                      </TableCell>
                      <TableCell>{row.employee}</TableCell>
                      <TableCell>{row.job}</TableCell>
                      <TableCell>{row.phase}</TableCell>
                      <TableCell>
                        {moment(row.date).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell>{`${tConvert(row.startTime)} to ${tConvert(
                        row.endTime
                      )}`}</TableCell>
                      <TableCell>{row.lunch == false ? "No" : "Yes"}</TableCell>
                      <TableCell>
                        {row.lunch
                          ? `${tConvert(row.lunchStartTime)} to ${tConvert(
                              row.lunchEndTime
                            )}`
                          : "none"}
                      </TableCell>
                      <TableCell>
                        {row.spectrum == false ? "No" : "Yes"}
                      </TableCell>
                      <TableCell>{row.user}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={allTimeTrack && allTimeTrack.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </section>
  );
}

export default TimeTrackTable;