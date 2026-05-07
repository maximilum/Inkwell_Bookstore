import React from "react";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  return <div>EditBook {id}</div>;
};

export default EditBook;
