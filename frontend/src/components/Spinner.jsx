import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Spinner = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => --prevCount);
    }, 1000);
    count === 0 &&
      navigate("/signin", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);
  return (
    <div
      className="d-flex justify-content-center flex-column align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">
        redirecting you to login in {count} seconds
      </h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading</span>
      </div>
    </div>
  );
};

export default Spinner;
