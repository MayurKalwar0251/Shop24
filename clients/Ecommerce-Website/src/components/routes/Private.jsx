import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/auth";
import Spinner from "../Spinner";

export default function Private() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/v1/auth/user-auth"
      );
      if (res.data.success) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
    console.log(ok);
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
