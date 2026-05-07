import React, { useState } from "react";
import { useFormik } from "formik";
import { useAddBookMutation } from "../../Redux/booksApiSlice";
import Swal from "sweetalert2";

const AddBook = () => {
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
        coverImage: imageFileName,
      };
      try {
        await addBook(newBookData).unwrap();
        Swal.fire({
          title: "Book added",
          text: "Your book is uploaded successfully!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, It's Okay!",
        });
        formik.resetForm();
        setimageFileName("");
        setimageFile(null);
      } catch (error) {
        console.error("Full error:", error);
        const errorMessage =
          error?.data?.error || error?.data?.message || "Failed to add book.";
        alert(`Error: ${errorMessage}`);
      }
    },
  });
  const [imageFile, setimageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [imageFileName, setimageFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  };
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

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
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? (
            <span className="">Adding.. </span>
          ) : (
            <span>Add Book</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
