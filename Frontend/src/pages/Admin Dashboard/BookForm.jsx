import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookForm = ({
  formik,
  imageURL,
  isLoading,
  isImageLoading,
  imageError,
  onImageUpload,
  fileInputRef,
  categoriesArray,
  mode = "add",
}) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const discount =
    formik.values.oldPrice &&
    formik.values.newPrice &&
    Number(formik.values.oldPrice) > 0 &&
    Number(formik.values.newPrice) < Number(formik.values.oldPrice)
      ? Math.round((1 - formik.values.newPrice / formik.values.oldPrice) * 100)
      : null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onImageUpload({ target: { files: [file] } });
  };

  /* Reusable input classes */
  const inputCls =
    "w-full px-3 py-[9px] text-[13px] font-dm border border-stone-300/50 rounded-[10px] outline-none bg-stone-50 text-stone-900 transition-all duration-150 appearance-none placeholder:text-[#c4b5ab] focus:border-stone-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(168,162,158,0.12)]";

  const labelCls =
    "block text-[11px] uppercase tracking-[0.1em] font-medium text-stone-500 mb-1.5";

  return (
    <div className="font-dm min-h-screen bg-stone-50 px-6 py-10 md:px-12">
      {/* Page header */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 mb-4 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-3.5 h-3.5"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 mb-1 font-medium">
          Admin · {mode === "add" ? "New Book" : "Edit Book"}
        </p>
        <h1 className="font-lora text-3xl text-stone-900 leading-tight">
          {mode === "add" ? "Add a Book" : "Edit Book"}
        </h1>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* ── Left column ── */}
          <div className="lg:col-span-3 space-y-5">
            {/* Book Details card */}
            <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
              <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-5">
                Book Details
              </p>
              <div className="space-y-5">
                <div>
                  <label htmlFor="title" className={labelCls}>
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    className={inputCls}
                    placeholder="e.g. The Midnight Library"
                  />
                </div>

                <div>
                  <label htmlFor="description" className={labelCls}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    className={`${inputCls} resize-none leading-relaxed`}
                    rows={5}
                    placeholder="Write a short synopsis or description…"
                  />
                  <p className="text-right text-[11px] text-stone-300 mt-1 tabular-nums">
                    {formik.values.description.length} chars
                  </p>
                </div>

                <div>
                  <label htmlFor="category" className={labelCls}>
                    Category
                  </label>
                  <div className="bf-select-wrap">
                    <select
                      id="category"
                      name="category"
                      onChange={formik.handleChange}
                      value={formik.values.category}
                      className={`${inputCls} pr-8 cursor-pointer`}
                    >
                      {categoriesArray?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing card */}
            <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                  Pricing
                </p>
                {discount !== null && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-3 h-3"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    {discount}% off
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="oldPrice" className={labelCls}>
                    Original Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[13px] pointer-events-none">
                      $
                    </span>
                    <input
                      id="oldPrice"
                      name="oldPrice"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.oldPrice}
                      className={`${inputCls} pl-[22px]`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="newPrice" className={labelCls}>
                    Sale Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[13px] pointer-events-none">
                      $
                    </span>
                    <input
                      id="newPrice"
                      name="newPrice"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.newPrice}
                      className={`${inputCls} pl-[22px]`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Cover image card */}
            <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
              <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-4">
                Cover Image
              </p>

              <div
                className={`group cover-wrap min-h-[240px] border-2 border-dashed rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-150 ${
                  isDragging
                    ? "border-amber-500 bg-amber-50"
                    : imageURL
                      ? "border-stone-200 bg-transparent"
                      : "border-stone-300 bg-stone-50"
                } ${isImageLoading ? "cursor-wait" : "cursor-pointer"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isImageLoading && fileInputRef.current?.click()}
              >
                {imageURL ? (
                  <>
                    <img
                      src={imageURL}
                      alt="Cover preview"
                      className="w-full h-full object-cover group-hover:object-contain rounded-[10px] max-h-[300px] block transition-all duration-200"
                    />
                    <div className="cover-overlay absolute inset-0 bg-transparent transition-colors duration-200 rounded-[10px] flex items-center justify-center">
                      <span className="cover-overlay-label text-white text-xs font-medium opacity-0 bg-stone-900/55 px-3 py-1.5 rounded-lg transition-opacity duration-150">
                        Change image
                      </span>
                    </div>
                  </>
                ) : isImageLoading ? (
                  <div className="text-center py-10">
                    <div className="mx-auto mb-3 w-7 h-7 border-[2.5px] border-stone-200 border-t-stone-900 rounded-full animate-spin-loader" />
                    <p className="text-xs text-stone-400">Uploading…</p>
                  </div>
                ) : (
                  <div className="text-center py-10 px-6">
                    <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#a8a29e"
                        strokeWidth={1.5}
                        className="w-[22px] h-[22px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-[13px] font-medium text-stone-600 mb-1">
                      {isDragging ? "Drop to upload" : "Drop image here"}
                    </p>
                    <p className="text-xs text-stone-400">or click to browse</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onImageUpload}
                className="hidden"
              />

              {imageError && (
                <p className="text-xs text-red-400 mt-2.5 flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-3.5 h-3.5 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Failed to upload image
                </p>
              )}

              {imageURL && !isImageLoading && (
                <p className="text-[11px] text-stone-400 mt-2 text-center">
                  Click the image to replace it
                </p>
              )}
            </div>

            {/* Trending toggle card */}
            <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-stone-800">Trending</p>
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                    Feature this book in the trending section of the store
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    formik.setFieldValue("trending", !formik.values.trending)
                  }
                  className={`relative w-[42px] h-6 rounded-full border-none p-0 shrink-0 cursor-pointer transition-colors duration-200 ${
                    formik.values.trending ? "bg-amber-500" : "bg-stone-200"
                  }`}
                  role="switch"
                  aria-checked={formik.values.trending}
                  aria-label="Mark as trending"
                >
                  <div
                    className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] ${
                      formik.values.trending ? "translate-x-[18px]" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-5">
          <button
            type="submit"
            disabled={isLoading || isImageLoading}
            className="w-full py-3.5 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-300 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-loader" />
                {mode === "add" ? "Adding book…" : "Saving changes…"}
              </>
            ) : mode === "add" ? (
              "Add Book"
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
