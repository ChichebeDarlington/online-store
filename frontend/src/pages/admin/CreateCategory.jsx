import axios from "axios";
import { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`${data?.category?.name} created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatedName = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/category/update-category/${
          selected._id
        }`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(data.msg);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(data.msg);
        setSelected(null);
        getAllCategory();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage category</h1>
          <div className="p-3 w-50">
            <CategoryForm
              handleSubmit={handleSubmit}
              setValue={setName}
              value={name}
            />
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
                  return (
                    <>
                      <tr key={category._id}>
                        <td>{category?.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(category.name);
                              setSelected(category);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2 "
                            onClick={() => handleDelete(category._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
