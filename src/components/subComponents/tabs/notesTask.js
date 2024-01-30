import React, { useState, useEffect } from "react";
import NoteTaskForm from "../forms/noteTask";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import NoteTaskTable from "../tables/noteTaskTable";
function NotesTask({ refreshData, taskId, noteTasks, refreshFlag }) {
  const [noteTaskId, setNoteTaskId] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  useEffect(() => {}, [refreshFlag]);
  const handleAddNoteTask = (data) => {
    axios
      .put(`${apiPath.prodPath}/api/task/addTaskNote/${taskId}`, data)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error adding the sub task",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Added Successfully",
          });
          refreshData();
        }
      });
  };
  const editNoteTask = (data, id) => {
    setCurrentItem(data);
    setNoteTaskId(id);
    setEditFlag(true);
  };
  const deleteNoteTask = (id) => {
    axios
      .delete(`${apiPath.prodPath}/api/task/delTaskNote/${taskId}&&${id}`)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Enable to delete the sub task",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Deleted successfully",
          });
          refreshData();
        }
      });
  };
  const editNoteTaskData = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/task/editTaskNote/${taskId}&&${id}`, data)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Enable to edit the Note",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Edited Successfully",
          });
          refreshData();
          setEditFlag(false);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: "Enable to edit the Note",
        });
      });
  };
  return (
    <div className="sub-task-wrapper">
      <NoteTaskForm
        handleForm={handleAddNoteTask}
        editFlag={editFlag}
        currentItem={currentItem}
        editNoteTaskData={editNoteTaskData}
      />
      {noteTasks && noteTasks.length ? (
        <NoteTaskTable
          noteTasks={noteTasks}
          editNoteTask={editNoteTask}
          deleteNoteTask={deleteNoteTask}
        />
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
}

export default NotesTask;
