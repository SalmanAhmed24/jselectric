"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import ComingSoon from "@/components/comingSoon";
import TaskNotification from "@/components/taskNotification";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function Home() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [taskNotificationFlag, setTaskNotificationFlag] = useState(false);
  useEffect(() => {
    if (user.user == null || user.user.error) {
      router.push("/login");
    }
    getUser();
  }, [user]);
  const getUser = async () => {
    await axios.get(`${apiPath.prodPath}/api/users/`).then((res) => {
      if (
        user !== null &&
        user.user !== null &&
        user.user.userInfo !== undefined
      ) {
        const filteredUser = res.data.allUsers.find(
          (i) => i.fullname == user.user.userInfo.fullname
        );
        setTaskNotificationFlag(filteredUser.taskNotification);
      }
    });
  };

  return (
    <section className={`${poppins.className} wrap-main-dashboard`}>
      {taskNotificationFlag && user !== null ? (
        <TaskNotification user={user.user} />
      ) : (
        <ComingSoon />
      )}
    </section>
  );
}
