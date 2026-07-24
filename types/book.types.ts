export interface Book {
  id: number;
  title: string;
  titleBn: string;
  author: string;
  category: string;
  categoryBn: string;
  rating: number;
  reviews: number;
  copiesAvailable: number;
  badge: string;
  coverImage: string;
}

export interface Category {
  name: string;
  nameBn: string;
}
