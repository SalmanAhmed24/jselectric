import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import AttachmentModal from "./attachmentsModal";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function VehicleInfoTable({ attachments, openEdit, deleteTool }) {
  const [actionFlag, setActionFlag] = useState(false);
  const [attachmentId, setAttachmentId] = useState("");
  const [item, setItem] = useState();
  const [modalFlag, setModalFlag] = useState(false);
  const handleActions = (id, objData) => {
    setAttachmentId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const handleModal = () => {
    setModalFlag(!modalFlag);
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 80 }}>Note</TableCell>
              <TableCell style={{ minWidth: 150 }}>Attachments</TableCell>
              <TableCell style={{ minWidth: 150 }}>Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>Time</TableCell>
              <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attachments.length == 0 ? (
              <TableRow>
                <p className={poppins.className}>No Tools Data Found</p>
              </TableRow>
            ) : (
              attachments.map((i) => {
                return (
                  <TableRow key={i.id}>
                    <TableCell>{i.note}</TableCell>
                    <TableCell>
                      {i.files.length ? (
                        <button onClick={handleModal}>View</button>
                      ) : (
                        "no files"
                      )}
                    </TableCell>
                    <TableCell>{i.date}</TableCell>
                    <TableCell>{i.time}</TableCell>

                    <TableCell style={{ position: "relative" }}>
                      <Image
                        onClick={() => handleActions(i.id, i)}
                        src="/dots.png"
                        width={32}
                        height={32}
                      />
                      {actionFlag && i.id == attachmentId ? (
                        <div className="dropdown-div">
                          <p
                            onClick={() => openEdit(i)}
                            className={poppins.className}
                          >
                            Edit
                          </p>
                          <p
                            onClick={() => deleteTool(i)}
                            className={poppins.className}
                          >
                            Delete
                          </p>
                        </div>
                      ) : null}
                    </TableCell>
                    {modalFlag ? (
                      <AttachmentModal
                        files={i.files}
                        openFlag={modalFlag}
                        closeModal={handleModal}
                      />
                    ) : null}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default VehicleInfoTable;
