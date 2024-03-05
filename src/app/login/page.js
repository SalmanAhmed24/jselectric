"use client";
import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { apiPath } from "../../utils/routes";
import { storeUser } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "./login.scss";
import axios from "axios";
const poppins = Poppins({
  weight: ["400", "700", "600", "900"],
  subsets: ["latin"],
});
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dipatch = useDispatch();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    const objData = {
      username: name,
      password,
    };
    axios
      .post(`${apiPath.devPath}/api/users/login`, objData)
      .then((res) => {
        console.log("here in login", res.data);
        dipatch(storeUser(res.data));
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className={`${poppins.className} login-wrap`}>
      <h1 className={poppins.className}>Welcome To JsElectric Dashboard</h1>
      <form className={poppins.className} onSubmit={handleLogin}>
        <input
          className={`${poppins.className} inp-wrap`}
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={`${poppins.className} inp-wrap`}
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={`${poppins.className} subBtn`}
          type="submit"
          value={"Login"}
        />
      </form>
    </section>
  );
}

export default Login;
