"use client";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import "./navbar.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "600"],
  style: "normal",
  subsets: ["latin"],
});
import Link from "next/link";
function Navbar() {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    console.log("this is user", user);
  }, [user]);
  return user.user == null ? null : (
    <nav className={`${poppins.className} navbar-wrap`}>
      <Link href={"/"}>Dashboard</Link>
      <Link href={"/list"}>List</Link>
      <Link href={"/purchasing"}>Purchasing</Link>
      <Link href={"/Jobs"}>Jobs</Link>
      <Link href={"/finance"}>Finance</Link>
      <Link href={"/reports"}>Reports</Link>
      <Link href={"/"}>Link 7</Link>
      <Link href={"/settings"}>Settings</Link>
    </nav>
  );
}

export default Navbar;
