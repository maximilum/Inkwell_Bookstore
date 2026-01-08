import { useEffect, useState } from "react";
import React from "react";
import styles from "./carousel2.module.css";
import BookInfo from "./BookInfo";

const Recommended = () => {
  // Data State
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   Fetching Effect
  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="my-16">
      <h2 className="m-8 text-2xl font-semibold mb-8">Recommended for you</h2>
      <div
        className={`w-11/12 mx-auto  flex gap-32 overflow-auto ${styles.carousel2}`}
      >
        {data.slice(8, 16).map((book, index) => (
          <BookInfo key={index} book={book} path="books" />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
