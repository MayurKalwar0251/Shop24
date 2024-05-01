import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/auth";

const LoginPage = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email, password }
      );

      if (response && response.data.success) {
        toast.success(response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate(location.state || "/");
      } else {
        toast.error(response.data.message);
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.success(response.data.message);
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email "
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoFocus
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary my-2">
            LOGIN
          </button>
          <div>
            <button
              onClick={() => {
                navigate("/forgot-password");
              }}
              type="submit"
              className="btn btn-primary "
            >
              FORGOT PASSWORD
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
