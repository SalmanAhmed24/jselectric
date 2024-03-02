const { Resend } = require("resend");
import moment from "moment";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(request) {
  try {
    const result = await request.json();
    const { data, error } = await resend.emails.send({
      from: "JsElectric <jselectric@resend.dev>",
      to: result.email.map((i) => {
        return `${i.email}`;
      }),
      subject: "New Notes Notification From App",
      html: `<div>
        <p>A new Note has been added. Please login to the app and see the details of the Note</p>
        <p><strong>Note Category</strong></p>
        <p>${result.dataObj.noteCategory}</p>
        <p><strong>Note Status</strong></p>
        <p>${result.dataObj.noteStatus}</p>
        <p><strong>Due Date</strong></p>
        <p>${moment(result.dataObj.dueDate).format("MM/DD/YYYY")}</p>
        <p><strong>Note Description</strong></p>
        <p>${result.dataObj.description}</p>
        <p><strong>Assigned By</strong></p>
        <p>${result.dataObj.user}</p>
        <h2>Note:</h2>
        <p>This new sub task is against the Task</p>
        <p><strong>Task Category</strong></p>
      <p>${result.task.taskCategory}</p>
      <p><strong>Task Status</strong></p>
      <p>${result.task.taskStatus}</p>
      <p><strong>Task Priority</strong></p>
      <p>${result.task.taskPriority}</p>
      <p><strong>Due Date</strong></p>
      <p>${moment(result.task.dueDate).format("MM/DD/YYYY")}</p>
      <p><strong>Task Description</strong></p>
      <p>${result.task.description}</p>
      <p><strong>Selected Module</strong></p>
      <p>${result.task.selectedModule.map((i) => i)}</p>
      <p><strong>Assigned By</strong></p>
      <p>${result.task.user}</p>
      <p><strong>Assigned To</strong></p>
      <p>${result.task.assignedTo.map((i) => i.fullname)}</p>
        </div>`,
    });
    if (error) {
      return NextResponse.json({ error });
    }
    return NextResponse.json({ dataEmail });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
