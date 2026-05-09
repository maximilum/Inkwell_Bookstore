import React, { useState, useRef, useEffect } from "react";
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

const EditBook = () => {
  const { id } = useParams();
  const { data, isLoading: bookIsLoading } = useGetBookQuery(id);
  const book = data?.data;

  useEffect(() => {
    if (book) {
      setimageURL(book.coverImage);
    }
  }, [book]);

  // Formik
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
      const newBookData = {
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
        await updateBook({ id, update: newBookData }).unwrap();
        Swal.fire({
          title: "Book updated",
          text: "Your book is updated successfully!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, It's Okay!",
        });
        formik.resetForm();
        setimageURL("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Full error:", error);
        const errorMessage =
          error?.data?.error || error?.data?.message || "Failed to add book.";
        alert(`Error: ${errorMessage}`);
      }
    },
  });

  // Categories
  const { categories } = useCategories();
  const categoriesArray = categories?.map((c) => ({
    value: c,
    label: capitalize(c),
  }));
  categoriesArray?.unshift({ value: "", label: "Choose A Category" });

  // image states
  const [updateBook, { isLoading, isError }] = useUpdateBookMutation();
  const [imageURL, setimageURL] = useState(book?.coverImage);
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Image Upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageError("");

    if (file) {
      try {
        setIsImageLoading(true);
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post(`${getBaseURL()}/api/images`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setimageURL(res.data.url);
      } catch (error) {
        setImageError(error.message);
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  return (
    <>
      <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Book</h2>

        {/* Form starts here */}
        <form onSubmit={formik.handleSubmit} className="">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder={"placeholder"}
            />
          </div>

          {/* Reusable Textarea for Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.description}
              className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder={"Enter description"}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              {"Category"}
            </label>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              {[
                { value: "", label: "Choose A Category" },
                { value: "business", label: "Business" },
                { value: "technology", label: "Technology" },
                { value: "fiction", label: "Fiction" },
                { value: "horror", label: "Horror" },
                { value: "adventure", label: "Adventure" },
                // Add more options as needed
              ].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Trending Checkbox */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="trending"
                id="trending"
                onChange={(e) =>
                  formik.setFieldValue("trending", e.target.checked)
                }
                checked={formik.values.trending}
                className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Trending
              </span>
            </label>
          </div>

          {/* Old Price */}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Old Price
            </label>
            <input
              id="oldPrice"
              name="oldPrice"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.oldPrice}
              className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder={"Old Price"}
            />
          </div>

          {/* New Price */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              New Price
            </label>
            <input
              id="newPrice"
              name="newPrice"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.newPrice}
              className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder={"New Price"}
            />
          </div>

          {/* Cover Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="mb-2 w-full"
            />
            {isImageLoading && (
              <p className="text-sm text-gray-500">Uploading...</p>
            )}
            {imageError && (
              <p className="text-sm text-red-500">cant upload image</p>
            )}
            {imageURL && <img src={imageURL} alt="" className="h-25 w-18" />}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
          >
            {isLoading ? (
              <span className="">Updating.. </span>
            ) : (
              <span>Update Book</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBook;
