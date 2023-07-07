import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        {/* <div> */}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        {/* </div> */}
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.deefaultProps = {
  title: "Online buy",
  description: "Mern stack project",
  keywords: "mern, react, node, mongodb",
  author: "Chichebe",
};

export default Layout;
