import { api } from "./api";
import { BookApiResponse, BookQuery } from "@/types/book.types";

export const bookService = {
  async getAllBooks(query?: BookQuery): Promise<BookApiResponse> {
    const params: Record<string, string> = {};
    if (query?.page) params.page = String(query.page);
    if (query?.search) params.search = query.search;
    if (query?.category) params.category = query.category;

    const response = await api.get<BookApiResponse>("/books", { params });
    return response.data;
  },
};
