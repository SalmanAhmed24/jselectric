const { Resend } = require("resend");
// import moment from "moment";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(process.env.MONGO_DB_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "JsElectric <jselectric@resend.dev>",
      to: ["kbaumhover@jselectric.com", "salman.ahmed.abbasi.24@gmail.com"],
      subject: "Schedule Emails Test from jsElectric",
      html: `<div>
      <p>This is a test for sending schedule emails</p>
      </div>`,
    });
    if (error) {
      return NextResponse.json({ error });
    }
    console.log("called every minute");
    return NextResponse.json({ dataEmail });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
