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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        .bf-root { font-family: 'DM Sans', sans-serif; }
        .bf-serif { font-family: 'Lora', serif; }
        .bf-input {
          width: 100%;
          padding: 9px 12px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          border: 0.5px solid #d6d3d1;
          border-radius: 10px;
          outline: none;
          background: #fafaf9;
          color: #1c1917;
          transition: border-color 150ms, background 150ms, box-shadow 150ms;
          appearance: none;
        }
        .bf-input:focus {
          border-color: #a8a29e;
          background: white;
          box-shadow: 0 0 0 3px rgba(168,162,158,0.12);
        }
        .bf-input::placeholder { color: #c4b5ab; }
        .bf-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
          color: #78716c;
          margin-bottom: 6px;
        }
        .bf-select-wrap { position: relative; }
        .bf-select-wrap::after {
          content: '';
          pointer-events: none;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid #a8a29e;
        }
        .bf-select-wrap .bf-input { padding-right: 32px; cursor: pointer; }
        .toggle-track {
          width: 42px;
          height: 24px;
          border-radius: 99px;
          background: #e7e5e4;
          position: relative;
          cursor: pointer;
          transition: background 200ms;
          border: none;
          padding: 0;
          flex-shrink: 0;
        }
        .toggle-track.on { background: #f59e0b; }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          transition: transform 200ms cubic-bezier(.34,1.56,.64,1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .toggle-track.on .toggle-thumb { transform: translateX(18px); }
        .cover-overlay {
          position: absolute; inset: 0;
          background: rgba(28,25,23,0);
          transition: background 200ms;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .cover-wrap:hover .cover-overlay { background: rgba(28,25,23,0.28); }
        .cover-overlay-label {
          color: white;
          font-size: 12px;
          font-weight: 500;
          opacity: 0;
          background: rgba(28,25,23,0.55);
          padding: 5px 12px;
          border-radius: 8px;
          transition: opacity 150ms;
        }
        .cover-wrap:hover .cover-overlay-label { opacity: 1; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.8s linear infinite; }
      `}</style>

      <div className="bf-root min-h-screen bg-stone-50 px-6 py-10 md:px-12">

        {/* Page header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 mb-4 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 mb-1 font-medium">
            Admin · {mode === "add" ? "New Book" : "Edit Book"}
          </p>
          <h1 className="bf-serif text-3xl text-stone-900 leading-tight">
            {mode === "add" ? "Add a Book" : "Edit Book"}
          </h1>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* ── Left column ── */}
            <div className="lg:col-span-3 space-y-5">

              {/* Book Details card */}
              <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-5">Book Details</p>
                <div className="space-y-5">

                  <div>
                    <label htmlFor="title" className="bf-label">Title</label>
                    <input
                      id="title" name="title" type="text"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      className="bf-input"
                      placeholder="e.g. The Midnight Library"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="bf-label">Description</label>
                    <textarea
                      id="description" name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      className="bf-input resize-none"
                      style={{ lineHeight: "1.6" }}
                      rows={5}
                      placeholder="Write a short synopsis or description…"
                    />
                    <p className="text-right text-[11px] text-stone-300 mt-1 tabular-nums">
                      {formik.values.description.length} chars
                    </p>
                  </div>

                  <div>
                    <label htmlFor="category" className="bf-label">Category</label>
                    <div className="bf-select-wrap">
                      <select
                        id="category" name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        className="bf-input"
                      >
                        {categoriesArray?.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing card */}
              <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Pricing</p>
                  {discount !== null && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {discount}% off
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="oldPrice" className="bf-label">Original Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[13px] pointer-events-none">$</span>
                      <input
                        id="oldPrice" name="oldPrice" type="number"
                        onChange={formik.handleChange}
                        value={formik.values.oldPrice}
                        className="bf-input"
                        style={{ paddingLeft: "22px" }}
                        placeholder="0.00"
                        min="0" step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="newPrice" className="bf-label">Sale Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[13px] pointer-events-none">$</span>
                      <input
                        id="newPrice" name="newPrice" type="number"
                        onChange={formik.handleChange}
                        value={formik.values.newPrice}
                        className="bf-input"
                        style={{ paddingLeft: "22px" }}
                        placeholder="0.00"
                        min="0" step="0.01"
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
                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-4">Cover Image</p>

                <div
                  className="cover-wrap"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => !isImageLoading && fileInputRef.current?.click()}
                  style={{
                    minHeight: "240px",
                    border: `2px dashed ${isDragging ? "#f59e0b" : imageURL ? "#e7e5e4" : "#d6d3d1"}`,
                    background: isDragging ? "#fffbeb" : imageURL ? "transparent" : "#fafaf9",
                    borderRadius: "12px",
                    cursor: isImageLoading ? "wait" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 150ms, background 150ms",
                  }}
                >
                  {imageURL ? (
                    <>
                      <img
                        src={imageURL}
                        alt="Cover preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                          maxHeight: "300px",
                          display: "block",
                        }}
                      />
                      <div className="cover-overlay">
                        <span className="cover-overlay-label">Change image</span>
                      </div>
                    </>
                  ) : isImageLoading ? (
                    <div className="text-center py-10">
                      <div
                        className="spinner mx-auto mb-3"
                        style={{
                          width: 28, height: 28,
                          border: "2.5px solid #e7e5e4",
                          borderTopColor: "#1c1917",
                          borderRadius: "50%",
                        }}
                      />
                      <p className="text-xs text-stone-400">Uploading…</p>
                    </div>
                  ) : (
                    <div className="text-center py-10 px-6">
                      <div
                        style={{
                          width: 48, height: 48,
                          background: "#f5f5f4",
                          borderRadius: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 12px",
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth={1.5} style={{ width: 22, height: 22 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                    onClick={() => formik.setFieldValue("trending", !formik.values.trending)}
                    className={`toggle-track ${formik.values.trending ? "on" : ""}`}
                    role="switch"
                    aria-checked={formik.values.trending}
                    aria-label="Mark as trending"
                  >
                    <div className="toggle-thumb" />
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
                  <div
                    className="spinner"
                    style={{
                      width: 16, height: 16,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                    }}
                  />
                  {mode === "add" ? "Adding book…" : "Saving changes…"}
                </>
              ) : (
                mode === "add" ? "Add Book" : "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookForm;
