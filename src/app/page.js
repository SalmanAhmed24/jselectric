"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function Home() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user.user == null) {
      router.push("/login");
    }
  }, [user]);
  return (
    <main className={`${poppins.className} home-dashboard`}>
      <section className="links-wrap">
        <div className="inner-links">
          <p className={poppins.className}>dashboard links</p>
        </div>
      </section>
      <section className={`${poppins.className} content-wrap`}>
        <div className="inner-content">
          <h1 className={poppins.className}>No data available yet</h1>
        </div>
      </section>
    </main>
  );
}
