import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../../Redux/booksApiSlice";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseURL from "../../utils/getBaseURL";
import useCategories from "../../utils/useCategories";
import capitalize from "../../utils/Capitalize";
import BookForm from "./BookForm";

const EditBook = () => {
  const { id } = useParams();
  const { data, isLoading: bookIsLoading } = useGetBookQuery(id);
  const book = data?.data;

  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const { categories } = useCategories();
  const [imageURL, setImageURL] = useState("");
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (book?.coverImage) setImageURL(book.coverImage);
  }, [book]);

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
      title: book?.title || "",
      description: book?.description || "",
      category: book?.category || "",
      oldPrice: book?.oldPrice || "",
      newPrice: book?.newPrice || "",
      trending: book?.trending || false,
    },
    enableReinitialize: true,
    onSubmit: async (data) => {
      const updatedBook = {
        _id: id,
        ...data,
        oldPrice: Number(data.oldPrice),
        newPrice: Number(data.newPrice),
        trending: Array.isArray(data.trending)
          ? data.trending.length > 0
          : Boolean(data.trending),
        coverImage: imageURL,
      };
      try {
        await updateBook({ id, update: updatedBook }).unwrap();
        Swal.fire({
          title: "Book updated",
          text: "Your changes have been saved!",
          icon: "success",
          confirmButtonColor: "#1c1917",
          confirmButtonText: "Done",
        });
      } catch (error) {
        console.error(error);
        const msg =
          error?.data?.error ||
          error?.data?.message ||
          "Failed to update book.";
        alert(`Error: ${msg}`);
      }
    },
  });

  // Show a minimal loading state while the book data is being fetched
  if (bookIsLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div
          style={{
            width: 32,
            height: 32,
            border: "2.5px solid #e7e5e4",
            borderTopColor: "#1c1917",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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
      mode="edit"
    />
  );
};

export default EditBook;
