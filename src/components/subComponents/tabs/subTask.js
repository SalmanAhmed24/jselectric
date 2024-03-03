import React, { useState, useEffect } from "react";
import SubTaskForm from "../forms/subTask";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import SubTaskTable from "../tables/subTaskTable";
function SubTask({ refreshData, taskId, subTasks, refreshFlag, task }) {
  const [subTaskId, setSubTaskId] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [assignedToOpt, setAssignedToOpt] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        setAssignedToOpt(
          res.data.allUsers.map((i) => {
            return { label: i.fullname, value: i.fullname, email: i.email };
          })
        );
      })
      .catch((err) => console.log(err));
  }, [refreshFlag]);
  const handleAddSubTask = (data, assignedToUser) => {
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
          sendSubTaskEmail(task, data, [
            {
              fullname: "Salman Ahmed Abbasi",
              email: "salman.ahmed.abbasi.24@gmail.com",
            },
            ...assignedToUser,
          ]);
          sendSubTaskEmailAssignedTo(task, data);
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
  const editSubTaskData = (data, id, assignedToUsers) => {
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
          console.log("before ^^^^", data.taskStatus);
          if (data.taskStatus == "Completed") {
            console.log("here ^^^^", data.taskStatus);
            sendCompleteSubTaskEmail(task, data, [
              {
                fullname: "Salman Ahmed Abbasi",
                email: "salman.ahmed.abbasi.24@gmail.com",
              },
              ...assignedToUsers,
            ]);
            sendSubTaskEmailCompAssignedBy(task, data);
          } else {
            sendEditSubTaskEmail(task, data, [
              {
                fullname: "Salman Ahmed Abbasi",
                email: "salman.ahmed.abbasi.24@gmail.com",
              },
              ...assignedToUsers,
            ]);
          }
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: "Enable to edit the sub task",
        });
      });
  };
  const sendSubTaskEmailCompAssignedBy = (task, data) => {
    console.log("here ^^^^", task, assignedToOpt);
    if (window && window !== undefined) {
      const taskUserEmail = assignedToOpt.find((i) => i.label == task.user);
      console.log("emails", email);
      fetch(`${window.location.origin}/api/assignBySubTaskComplete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: [
            {
              fullname: "Salman Ahmed Abbasi",
              email: "salman.ahmed.abbasi.24@gmail.com",
            },
            { fullname: taskUserEmail.label, email: taskUserEmail.email },
          ],
          task: task,
          dataObj: data,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  const sendSubTaskEmailAssignedTo = (task, data) => {
    if (window && window !== undefined) {
      var emails = data.assignedTo.map((i) => i.email);
      fetch(`${window.location.origin}/api/newSubTaskEmailAssignedTo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: [
            {
              fullname: "Salman Ahmed Abbasi",
              email: "salman.ahmed.abbasi.24@gmail.com",
            },
            ...emails,
          ],
          task: task,
          dataObj: data,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  const sendSubTaskEmail = (task, data, assignedToUsers) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/newSubTaskEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: assignedToUsers,
          task: task,
          dataObj: data,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  const sendEditSubTaskEmail = (task, data, assignedToUsers) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/editSubTaskEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: assignedToUsers,
          task: task,
          dataObj: data,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  const sendCompleteSubTaskEmail = (task, data, assignedToUsers) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/completeSubTaskEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: assignedToUsers,
          task: task,
          dataObj: data,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="sub-task-wrapper">
      <SubTaskForm
        handleForm={handleAddSubTask}
        editFlag={editFlag}
        currentItem={currentItem}
        editSubTaskData={editSubTaskData}
        task={task}
      />
      {subTasks && subTasks.length ? (
        <SubTaskTable
          subTasks={subTasks}
          editSubTask={editSubTask}
          deleteSubTask={deleteSubTask}
          task={task}
        />
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
}

export default SubTask;
