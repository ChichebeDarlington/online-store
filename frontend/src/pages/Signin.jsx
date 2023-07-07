import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/context/context";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  // const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        { email, password }
      );
      if (data.success) {
        toast.success(data.msg);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate(
          `${
            auth?.user?.role === true ? "/dashboard/admin" : "/dashboard/user"
          }`
        );
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.msg);
    }
  };

  return (
    <Layout title={`Online buy -Sign-in`}>
      <div className="signup">
        <h1>Signin page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signin-btn">
            <button>submit</button>
            <button onClick={() => navigate("/forgot-password")}>
              forgot password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signin;
