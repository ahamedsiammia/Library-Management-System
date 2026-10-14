import { BookApiResponse, BookQuery } from "@/types/book.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const bookService = {
  async getAllBooks(query?: BookQuery): Promise<BookApiResponse> {
    const params = new URLSearchParams();
    if (query?.page) params.append("page", String(query.page));
    if (query?.search) params.append("search", query.search);
    if (query?.category) params.append("category", query.category);

    const queryString = params.toString();
    const url = `${API_BASE_URL}/books${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch books: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  },
};
