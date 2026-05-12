import BookCard from "./BookCard";
import useDebounce from "../../utils/useDebouncer";
import { useEffect } from "react";
import getBaseURL from "../../utils/getBaseURL";
import { useState } from "react";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import { useGetAllBooksQuery } from "../../Redux/booksApiSlice";
import PlainLoading from "../../components/LoadingScreen/Plain_Loading";
import { VirtuosoGrid } from "react-virtuoso";
import { forwardRef } from "react";

// Virtualization component, must happen outside the render cycle
const gridComponents = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] justify-items-center"
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div {...props} className="p-4 w-full flex justify-center">
      {children}
    </div>
  ),
};

const Discover = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const getSearch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${getBaseURL()}/api/search`, {
          params: {
            search: debouncedSearch,
          },
        });
        if (res.data.success) {
          setBooks(res.data.data);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSearch();
  }, [debouncedSearch]);

  if (error) return "Error";
  return (
    <>
      <div className="h-[60px] sm:h-[67px]  w-full"></div>
      <div className="flex justify-center my-4 mx-auto sm:w-[80vw] md:w-[60vw] lg:w-[40vw] my-10">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-4 focus:outline-none border rounded-full px-6 bg-gray-300/30"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <OrbitProgress color="#ffd700" size="large" text="" textColor="" />
        </div>
      ) : (
        <div className="p-8 sm:px-8 md:px-16 lg:px-32">
          <VirtuosoGrid
            useWindowScroll
            totalCount={books.length}
            components={gridComponents}
            itemContent={(index) => {
              return books[index] ? <BookCard book={books[index]} /> : null;
            }}
          />
        </div>
      )}
    </>
  );
};

export default Discover;
