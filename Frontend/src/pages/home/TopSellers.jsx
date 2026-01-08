import React from "react";
import BookInfo from "./BookInfo";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./carousel.module.css";

const TopSellers = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("Select a genre");

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredBooks =
    filter === "Select a genre"
      ? books
      : books.filter((book) => book.category === filter);
  //   console.log(filteredBooks);

  if (isLoading) return <div>Loading...</div>;
  if (filteredBooks.length === 0) return <div>No books found</div>;

  return (
    <>
      <div className="m-8">
        <h1 className="text-4xl font-bold mb-4">Top Sellers</h1>
        <select
          onClick={(e) => setFilter(e.target.value)}
          name=""
          id=""
          className="h-12 w-64 bg-[#ededed] p-1 mb-12 rounded text-lg focus:outline-none"
        >
          <option value="Select a genre">Select a genre</option>
          <option value="business">business</option>
          <option value="marketing">marketing</option>
          <option value="business">business</option>
          <option value="horror">horror</option>
          <option value="fiction">fiction</option>
          <option value="adventure">adventure</option>
        </select>
      </div>
      <div
        className={`w-11/12 mx-auto flex gap-32 overflow-auto ${styles.carousel}`}
      >
        {filteredBooks.map((book, index) => (
          <BookInfo key={index} book={book} path="books" />
        ))}
      </div>
    </>
  );
};

export default TopSellers;
