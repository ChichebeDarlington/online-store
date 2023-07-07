import Layout from "../components/Layout";
import { useAuth } from "../components/context/context";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { toast } from "react-toastify";
import { Prices } from "../components/Prices";
import { useCart } from "../components/context/cart";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/produt-count`
      );
      if (data.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotalCount();
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/produt-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.lenght || !radio.length) getAllProducts();
  }, [checked.lenght, radio.length]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/category/get-all-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((filter) => filter !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/product-filters`
      );
      setProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.lenght || radio.length) filterProduct();
  }, [checked, radio]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/produt-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  console.log(cart);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <h6 className="text-center">Filter by category</h6>
          <div className="d-flex flex-column">
            {categories.map((category) => {
              return (
                <Checkbox
                  key={category._id}
                  onChange={(e) => handleFilter(e.target.checked, category._id)}
                >
                  {category?.name}
                </Checkbox>
              );
            })}
          </div>
          <h6 className="text-center">Filter by price</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((price) => {
                return (
                  <div key={price._id}>
                    <Radio value={price.array}>{price?.name}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              reset filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1>all products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((product) => {
              return (
                <>
                  {/* <Link
                  className="product-link"
                  key={product._id}
                  to={`/dashboard/admin/update-product/${product.slug}`}
                > */}
                  <div
                    className="card m-2 "
                    style={{ width: "18rem" }}
                    key={product._id}
                  >
                    <Link
                      className="product-link"
                      // key={product._id}
                      to={`/dashboard/admin/update-product/${product.slug}`}
                    >
                      <img
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/product/product-photo/${product._id}`}
                        alt={product?.name}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text">${product.price}</p>
                      </div>
                    </Link>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/${product._id}`)}
                    >
                      More details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast("Cart added");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                  {/* </Link> */}
                </>
              );
            })}
          </div>
          <div className="m-2 p-3">
            {products && products?.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading" : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
