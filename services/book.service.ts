import { Book } from "@/types/book.types";
import { BOOKS_DATA } from "@/constants";

export const bookService = {
  async getAllBooks(): Promise<Book[]> {
    return BOOKS_DATA;
  },
};
