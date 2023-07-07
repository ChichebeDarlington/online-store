import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/Search";

const SearchInput = () => {
  const { search, setSearch } = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/search-product/${
          search.keywords
        }`
      );
      setSearch({ ...search, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="search"
          aria-label="search"
          className="form-control me-2"
          value={search.keywords}
          onChange={(e) => setSearch({ ...search, keywords: e.target.value })}
        />
        <button className="btn btn-online-success">search</button>
      </form>
    </div>
  );
};

export default SearchInput;
