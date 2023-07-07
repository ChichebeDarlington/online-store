import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/get-single-product/${
          params.slug
        }`
      );
      setId(data?.product?._id);
      setName(data?.product?.name);
      setDescription(data?.product?.description);
      setPrice(data?.product?.price);
      setQuantity(data?.product?.quantity);
      setCategory(data?.product?.category?.name);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

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

  const handleDelete = async () => {
    try {
      const answer = prompt("Are sure you want to delete this product");
      if (!answer) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/product/delete-product/${id}`
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category);
      productData.append("photo", photo);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.msg);
        navigate("/dashboard/admin/create-product");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Update Product</h1>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="select category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories.map((cate) => {
                return (
                  <Option key={cate._id} value={cate._id}>
                    {cate?.name}
                  </Option>
                );
              })}
            </Select>
            <div className="m-3">
              <label
                // htmlFor="upload image"
                className="btn btn-outline-secondary"
              >
                {photo ? photo.name : "upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  // hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="m-3">
              <input
                type="text"
                placeholder="Input product name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="m-3">
              <textarea
                name="description"
                type="text"
                placeholder="Input your description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="m-3">
              <input
                type="number"
                placeholder="Input your price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="m-3">
              <input
                type="number"
                placeholder="Input your quantity"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="m-3">
              <Select
                bordered={false}
                size="large"
                placeholder="Input your name"
                className="form-select mb-3"
                showSearch
                value={shipping}
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3 m-3 d-flex justify-content-between">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update product
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
