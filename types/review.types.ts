export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    profileImage?: string;
  };
}

export interface CreateReviewPayload {
  bookId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewPayload {
  rating?: number;
  comment?: string;
}

export interface ReviewApiResponse {
  success: boolean;
  data: Review[];
  message?: string;
}
