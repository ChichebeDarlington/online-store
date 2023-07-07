import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/get-all-product`
      );
      const { products } = data;
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center">list product</h1>
        <div className="d-flex flex-wrap">
          {products?.map((product) => {
            return (
              <Link
                className="product-link"
                key={product._id}
                to={`/dashboard/admin/update-product/${product.slug}`}
              >
                <div className="card m-2 " style={{ width: "18rem" }}>
                  <img
                    src={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/product/product-photo/${product._id}`}
                    alt={product?.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="card-text">{product.description}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
