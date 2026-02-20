const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    trending: {
      type: Boolean,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Book = mongoose.model("book", schema);

module.exports = Book;

onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
  const patch = dispatch(
    postApi.util.updateQueryData("getBooks", undefined, (draft) => {
      const index = draft.findIndex((b) => b.id === arg.id);
      if (index !== -1) draft[index] = arg;
    }),
  );
  try {
    await queryFulfilled;
  } catch {
    patch.undo();
  }
};
