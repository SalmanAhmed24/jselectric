const { Resend } = require("resend");
import moment from "moment";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(request) {
  try {
    let dataObj = await request.json();

    const { data, error } = await resend.emails.send({
      from: "JsElectric <jselectric@resend.dev>",
      to: dataObj.email.map((i) => `${i}`),
      subject: "Task Completed",
      html: `<div>
      <p>The Task that was assigned by you has been marked as completed. Please login to the app and see the details of the task</p>
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
