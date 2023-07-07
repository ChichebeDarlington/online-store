import { Layout } from "antd";
import { Link } from "react-router-dom";
import { useSearch } from "./context/Search";

const SearchValues = () => {
  const { search, setSearch } = useSearch();
  console.log(search);

  return (
    <Layout title="Search results">
      <div className="container">
        <div className="text-center">
          <h1>Search results</h1>
          <h6>
            {search?.results?.results.length < 1
              ? "No product found"
              : `Found ${search?.results?.results?.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {search?.results?.results.map((product) => {
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
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">${product.price}</p>
                      <button className="btn btn-primary ms-1">
                        More details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchValues;
