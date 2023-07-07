import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <Layout title="Go back page not found">
      <div className="notfound">
        <h1 className="nftitle">404 not found</h1>
        <Link to="/" className="nfbtn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
