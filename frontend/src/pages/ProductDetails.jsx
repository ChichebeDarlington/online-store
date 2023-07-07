import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const ProductDetails = () => {
  const [product, setProduct] = useState("");
  const [relatedProduct, setRelatedProduct] = useState([]);

  const params = useParams();
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/get-single-product-by-id/${
          params.pId
        }`
      );
      console.log(data);
      setProduct(data?.product);
      getRelatedProduct(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    // getRelatedProduct();
  }, [params.slug]);

  const getRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/product/related-product/${pid}/${cid}`
      );
      console.log(data);
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(product);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 mt-2">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/product/product-photo/${
              product._id
            }`}
            alt={product?.name}
            className="card-img-top"
            height="300px"
            width="350px"
          />
        </div>
        <div className="col-md-6 text-center">
          <h2>Product details</h2>
          <h6>Name: {product?.name}</h6>
          <h6>description: {product?.description}</h6>
          <h6>price: {product?.price}</h6>
          <h6>category: {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">Add to cart</button>
        </div>
      </div>
      <div className="row">
        <h6>similar products</h6>
        {relatedProduct.length < 1 && <p>No similar products</p>}
        <div className="d-flex flex-wrap">
          {relatedProduct?.map((product) => {
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
    </Layout>
  );
};

export default ProductDetails;
