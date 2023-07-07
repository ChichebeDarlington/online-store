import Layout from "./Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/context/context";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //   const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`,
        { email, newPassword, secret }
      );
      if (data.success) {
        toast.success(data.msg);
        navigate("/signin");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.msg);
    }
  };

  return (
    <Layout>
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
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Secret
            </label>
            <input
              type="password"
              className="form-control"
              id="secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <div className="signin-btn">
            <button>submit</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
