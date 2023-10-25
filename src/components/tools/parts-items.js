import "./style.scss";
import PartsItemsForm from "./partForm";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";
function PartsItems({ data }) {
  const [editFlag, setEditFlag] = useState(false);
  const addParts = (data) => {
    console.log(data);
  };
  return (
    <section className="parts-wrap">
      <PartsItemsForm data={data} addParts={addParts} editFlag={editFlag} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>Parts No</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>Parts No</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}

export default PartsItems;
