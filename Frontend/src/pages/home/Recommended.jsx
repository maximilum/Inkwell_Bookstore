import React from "react";
import styles from "./carousel2.module.css";
import BookInfo from "./BookInfo";
import { useGetAllBooksQuery } from "../../Redux/booksApiSlice";

const Recommended = () => {
  const { data, isLoading } = useGetAllBooksQuery();
  const books = data?.data || [];
  console.log(books);
  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="my-16">
      <h2 className="m-8 text-2xl font-semibold mb-8">Recommended for you</h2>
      <div
        className={`w-11/12 mx-auto  flex gap-32 overflow-auto ${styles.carousel2}`}
      >
        {books.slice(8, 16).map((book, index) => (
          <BookInfo key={index} book={book} path="books" />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
