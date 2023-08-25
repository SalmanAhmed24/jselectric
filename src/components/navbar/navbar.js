"use client";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import "./navbar.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "600"],
  subsets: ["latin"],
});
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storeUser } from "../../store/slices/userSlice";
function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    console.log("this is user", user);
  }, [user]);
  const handleLogout = () => {
    dispatch(storeUser(null));
    router.push("/login");
  };
  return (
    <>
      {user.user == null ? null : (
        <div className={`${poppins.className} navbar-wrap`}>
          <Link href={"/"}>Dashboard</Link>
          <Link href={"/list"}>List</Link>
          <Link href={"/purchasing"}>Purchasing</Link>
          <Link href={"/Jobs"}>Jobs</Link>
          <Link href={"/finance"}>Finance</Link>
          <Link href={"/reports"}>Reports</Link>
          <Link href={"/"}>Link 7</Link>
          <Link href={"/settings"}>Settings</Link>
          <div className="logout-wrap">
            <button
              className={`${poppins.className} logout`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
