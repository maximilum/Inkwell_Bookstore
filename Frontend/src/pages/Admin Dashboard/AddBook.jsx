import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useAddBookMutation } from "../../Redux/booksApiSlice";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseURL from "../../utils/getBaseURL";
import useCategories from "../../utils/useCategories";
import capitalize from "../../utils/Capitalize";
import BookForm from "./BookForm";

const AddBook = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const { categories } = useCategories();
  const [imageURL, setImageURL] = useState("");
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  const categoriesArray = categories?.map((c) => ({
    value: c,
    label: capitalize(c),
  }));
  categoriesArray?.unshift({ value: "", label: "Choose A Category" });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageError("");
    if (!file) return;
    try {
      setIsImageLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(`${getBaseURL()}/api/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageURL(res.data.url);
    } catch (error) {
      setImageError(error.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      oldPrice: "",
      newPrice: "",
      trending: false,
    },
    onSubmit: async (data) => {
      const newBookData = {
        ...data,
        oldPrice: Number(data.oldPrice),
        newPrice: Number(data.newPrice),
        trending: Array.isArray(data.trending)
          ? data.trending.length > 0
          : Boolean(data.trending),
        coverImage: imageURL,
      };
      try {
        await addBook(newBookData).unwrap();
        Swal.fire({
          title: "Book added",
          text: "Your book is uploaded successfully!",
          icon: "success",
          confirmButtonColor: "#1c1917",
          confirmButtonText: "Done",
        });
        formik.resetForm();
        setImageURL("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        console.error(error);
        const msg =
          error?.data?.error || error?.data?.message || "Failed to add book.";
        alert(`Error: ${msg}`);
      }
    },
  });

  return (
    <BookForm
      formik={formik}
      imageURL={imageURL}
      isLoading={isLoading}
      isImageLoading={isImageLoading}
      imageError={imageError}
      onImageUpload={handleImageUpload}
      fileInputRef={fileInputRef}
      categoriesArray={categoriesArray}
      mode="add"
    />
  );
};

export default AddBook;
