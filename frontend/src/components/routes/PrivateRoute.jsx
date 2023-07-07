import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/context";
import axios from "axios";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const { auth, setAuth } = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/user-auth`
      );
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
