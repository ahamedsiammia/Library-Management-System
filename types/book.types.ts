export interface Book {
  id: string;
  title: string;
  titleBn?: string;
  author: string;
  authorBio?: string;
  category: string;
  categoryBn?: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  coverImage: string;
  isbn: string;
  publisher: string;
  publisherBn?: string;
  publicationYear: number;
  edition?: string;
  language?: string;
  pages: number;
  format?: string;
  totalCopies: number;
  copiesAvailable: number;
  shelfLocation: string;
  status?: string;
  description: string;
  descriptionBn?: string;
  keyTopics: string[];
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BookMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface BookApiResponse {
  success: boolean;
  message: string;
  meta: BookMeta;
  data: Book[];
}

export interface BookQuery {
  page?: number;
  search?: string;
  category?: string;
}

export interface Category {
  name: string;
  nameBn: string;
}
