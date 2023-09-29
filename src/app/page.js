"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import ComingSoon from "@/components/comingSoon";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function Home() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user.user == null || user.user.error) {
      router.push("/login");
    }
  }, [user]);
  return (
    <section>
      <ComingSoon />
    </section>
  );
}
