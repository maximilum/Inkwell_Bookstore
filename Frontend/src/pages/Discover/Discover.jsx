import BookCard from "./BookCard";
import { useGetAllBooksQuery } from "../../Redux/booksApiSlice";
import PlainLoading from "../../components/LoadingScreen/Plain_Loading";

const Discover = () => {
  const { data, isLoading, error } = useGetAllBooksQuery();
  const books = data?.data;
  if (isLoading) return <PlainLoading />;
  if (error) return "Error";
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-16">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </>
  );
};

export default Discover;
