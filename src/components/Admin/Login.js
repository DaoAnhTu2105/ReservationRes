import React from "react";

import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();

  const baseUrl = `http://tablereservationapi.somee.com/API/User/Login`;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.data;

        localStorage.setItem("token", token);

        const decodedToken = parseJwt(token);
        const role = decodedToken.IsAdmin;
        console.log("bbbbbbbb", decodedToken);
        console.log("role", role);
        if (role === "True") {
          console.log("admin", decodedToken);
          nav("/admin/users");
        } else if (role === "False") {
          console.log("aaaaaa", decodedToken);
          nav("/staff/tableReservation");
        }
      } else {
        console.error("Đăng nhập thất bại:", response.status);
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  return (
    <div>
      <link
        rel="icon"
        type="image/png"
        href="../../../public/assets/loginBackground.jpg"
      />
      <div style={{ backgroundColor: "#666666" }}>
        <div class="limiter">
          <div class="container-login100">
            <div class="wrap-login100">
              <form class="login100-form" onSubmit={handleLogin}>
                <span class="login100-form-title p-b-43">
                  Login to continue
                </span>
                <div class="wrap-input100">
                  <input id="email" class="input100" type="text" name="email" />
                  <span class="focus-input100"></span>
                  <span class="label-input100">Email</span>
                </div>
                <div class="wrap-input100">
                  <input
                    id="password"
                    class="input100"
                    type="password"
                    name="password"
                  />
                  <span class="focus-input100"></span>
                  <span class="label-input100">Password</span>
                </div>
                <div class="container-login100-form-btn">
                  <button class="login100-form-btn" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div class="login100-more"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
