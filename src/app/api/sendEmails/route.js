const { Resend } = require("resend");
import moment from "moment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function GET(request) {
  console.log("in here");
  try {
    await mongoose.connect(process.env.MONGO_DB_KEY);
    // const { data, error } = await resend.emails.send({
    //   from: "JsElectric <jselectric@resend.dev>",
    //   to: dataObj.email.map((i) => {
    //     return `${i.email}`;
    //   }),
    //   subject: "New Task Notification From App",
    //   html: `<div>
    //   <p>A new task has been assigned to you. Please login to the app and see the details of the task</p>
    //   <p><strong>Task Category</strong></p>
    //   <p>${dataObj.taskData.taskCategory}</p>
    //   <p><strong>Task Status</strong></p>
    //   <p>${dataObj.taskData.taskStatus}</p>
    //   <p><strong>Task Priority</strong></p>
    //   <p>${dataObj.taskData.taskPriority}</p>
    //   <p><strong>Due Date</strong></p>
    //   <p>${moment(dataObj.taskData.dueDate).format("MM/DD/YYYY")}</p>
    //   <p><strong>Task Description</strong></p>
    //   <p>${dataObj.taskData.description}</p>
    //   <p><strong>Selected Module</strong></p>
    //   <p>${dataObj.taskData.selectedModule.map((i) => i)}</p>
    //   <p><strong>Assigned By</strong></p>
    //   <p>${dataObj.taskData.user}</p>
    //   <p><strong>Assigned To</strong></p>
    //   <p>${dataObj.taskData.assignedTo.map((i) => i.fullname)}</p>
    //   </div>`,
    // });
    if (error) {
      return NextResponse.json({ error });
    }
    console.log("called every minute");
    return NextResponse.json({ dataEmail });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
