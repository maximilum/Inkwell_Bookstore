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
      <div className="h-[60px] sm:h-[67px]  w-full"></div>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8  p-8 sm:p-16 md:p-16 lg:p-32">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </>
  );
};

export default Discover;
