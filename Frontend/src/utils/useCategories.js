import axios from "axios";
import getBaseURL from "./getBaseURL";
import { useState } from "react";
import { useEffect } from "react";

const useCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${getBaseURL()}/api/categories`);
        setCategories(res.data.data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);
  return { categories, error, isLoading };
};
export default useCategories;
