import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../Redux/booksApiSlice";

const Book = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);
  const book = data?.data || {};
  console.log(book, id);

  if (isLoading) return <h1 className="">Loading</h1>;
  return (
    <div className="flex p-20 flex-col">
      <h1 className="text-2xl font-bold mb-8">{book.title}</h1>
      <h2>{book.description}</h2>
    </div>
  );
};

export default Book;
