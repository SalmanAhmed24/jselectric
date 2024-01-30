import React, { useState, useEffect } from "react";
import SubTaskForm from "../forms/subTask";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import SubTaskTable from "../tables/subTaskTable";
function SubTask({ refreshData, taskId, subTasks, refreshFlag }) {
  const [subTaskId, setSubTaskId] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  useEffect(() => {}, [refreshFlag]);
  const handleAddSubTask = (data) => {
    axios
      .put(`${apiPath.prodPath}/api/task/addSubTask/${taskId}`, data)
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
  const editSubTask = (data, id) => {
    setCurrentItem(data);
    setSubTaskId(id);
    setEditFlag(true);
    console.log("here", data, id);
  };
  const deleteSubTask = (id) => {
    axios
      .delete(`${apiPath.prodPath}/api/task/delSubTask/${taskId}&&${id}`)
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
  const editSubTaskData = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/task/editSubTask/${taskId}&&${id}`, data)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Enable to edit the sub task",
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
          text: "Enable to edit the sub task",
        });
      });
  };
  return (
    <div className="sub-task-wrapper">
      <SubTaskForm
        handleForm={handleAddSubTask}
        editFlag={editFlag}
        currentItem={currentItem}
        editSubTaskData={editSubTaskData}
      />
      {subTasks && subTasks.length ? (
        <SubTaskTable
          subTasks={subTasks}
          editSubTask={editSubTask}
          deleteSubTask={deleteSubTask}
        />
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
}

export default SubTask;
