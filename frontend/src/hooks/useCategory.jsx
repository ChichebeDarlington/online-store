import axios from "axios";
import { useState, useEffect } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  // get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(``);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useCategory;
