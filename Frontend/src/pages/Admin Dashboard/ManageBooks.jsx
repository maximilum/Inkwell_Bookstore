import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../../Redux/booksApiSlice";
import { Link, useNavigate } from "react-router-dom";
import PlainLoading from "../../components/LoadingScreen/Plain_Loading";
import { useState } from "react";
import {
  Pencil,
  Trash2,
  Search,
  BookOpen,
  LayoutGrid,
  DollarSign,
} from "lucide-react";

const ManageBooks = () => {
  const navigate = useNavigate();

  const { data, refetch, isLoading } = useGetAllBooksQuery();
  const books = data?.data || [];

  // search and filter functionality
  const [search, setSearch] = useState("");
  const filtered = books.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase()),
  );

  // calculate total value and unique categories
  const totalValue = books.reduce((sum, b) => sum + (b.newPrice || 0), 0);
  const uniqueCategories = new Set(books.map((b) => b.category)).size;

  // Handle deleting a book
  const [deleteBook] = useDeleteBookMutation();
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id).unwrap();
      alert("Book deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete book:", error.message);
      alert("Failed to delete book. Please try again.");
    }
  };

  // Handle navigating to Edit Book page
  const handleEditClick = (id) => {
    navigate(`dashboard/edit-book/${id}`);
  };
  if (isLoading) return <PlainLoading />;
  return (
    <div className="font-dm min-h-screen bg-stone-50 px-6 py-10 md:px-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 mb-1 font-medium">
            Admin · Book Management
          </p>
          <h1 className="font-lora text-3xl text-stone-900 leading-tight">
            Book Catalogue
          </h1>
        </div>
        <Link
          to="/dashboard/add-book"
          className="inline-flex items-center gap-2 bg-stone-900 text-white text-[13px] font-medium px-4 py-2.5 rounded-xl hover:bg-stone-700 transition-colors self-start sm:self-auto"
        >
          <span className="text-base leading-none">+</span>
          Add New Book
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl border border-stone-100 px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={13} className="text-stone-400" />
            <span className="text-[11px] uppercase tracking-wider text-stone-400">
              Total Books
            </span>
          </div>
          <p className="text-2xl font-semibold text-stone-900">
            {books.length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-100 px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid size={13} className="text-stone-400" />
            <span className="text-[11px] uppercase tracking-wider text-stone-400">
              Categories
            </span>
          </div>
          <p className="text-2xl font-semibold text-stone-900">
            {uniqueCategories}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-100 px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={13} className="text-stone-400" />
            <span className="text-[11px] uppercase tracking-wider text-stone-400">
              Avg. Price
            </span>
          </div>
          <p className="text-2xl font-semibold text-stone-900">
            ${books.length ? (totalValue / books.length).toFixed(2) : "0.00"}
          </p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
        {/* Search Bar */}
        <div className="px-5 py-3.5 border-b border-stone-100 flex items-center gap-3">
          <Search size={15} className="text-stone-300 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search titles or categories…"
            className="flex-1 text-sm text-stone-700 placeholder-stone-300 outline-none bg-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[11px] text-stone-400 hover:text-stone-600 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="px-5 py-3 text-left text-[11px] font-medium text-stone-400 uppercase tracking-wider w-12">
                  #
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-stone-400 uppercase tracking-wider w-20">
                  Cover
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 text-right text-[11px] font-medium text-stone-400 uppercase tracking-wider pr-6">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((book, index) => (
                  <tr
                    key={book._id || index}
                    className="mb-row border-b border-stone-50 last:border-0"
                  >
                    <td className="px-5 py-4 text-[13px] text-stone-300 font-mono tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="w-10 h-[54px] rounded-lg overflow-hidden bg-stone-100 shadow-sm">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="mb-cover w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </td>
                    <td className="px-5 py-4 max-w-[220px]">
                      <p className="text-sm font-medium text-stone-800 truncate">
                        {book.title}
                      </p>
                      {book.author && (
                        <p className="text-xs text-stone-400 mt-0.5 truncate">
                          {book.author}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-block text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-stone-800">
                        <span className="text-stone-400 font-normal text-[11px] mr-0.5">
                          $
                        </span>
                        {Number(book.newPrice).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-5 py-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/dashboard/edit-book/${book._id}`}
                          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Pencil size={11} />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Trash2 size={11} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <BookOpen
                      size={28}
                      className="text-stone-200 mx-auto mb-3"
                    />
                    <p className="text-sm text-stone-400">
                      {search
                        ? `No books match "${search}".`
                        : "No books in the catalogue yet."}
                    </p>
                    {!search && (
                      <Link
                        to="/dashboard/add-book"
                        className="inline-block mt-3 text-xs font-medium text-stone-900 underline underline-offset-2 hover:text-stone-600"
                      >
                        Add your first book
                      </Link>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-stone-50 bg-stone-50/60 flex items-center justify-between">
            <p className="text-xs text-stone-400">
              Showing{" "}
              <span className="font-medium text-stone-600">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-stone-600">
                {books.length}
              </span>{" "}
              {books.length === 1 ? "book" : "books"}
            </p>
            {search && filtered.length < books.length && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2"
              >
                Show all
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
