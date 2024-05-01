import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/auth";

const ForgotPasswordPage = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [sport, setSport] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/forgot-password",
        { email, sport, newPassword, confirmPassword }
      );

      if (response && response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
        navigate("/forgot-password");
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
          <h4 className="title">Forgot Password FORM</h4>

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
              type="text"
              className="form-control"
              placeholder="Enter Your Favourite Sport You Entered while registration"
              required
              value={sport}
              onChange={(e) => {
                setSport(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your New Password"
              required
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
          <div>
            <button
              onClick={() => {
                navigate("/login");
              }}
              type="submit"
              className="btn btn-primary "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
