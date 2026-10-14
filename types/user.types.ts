export interface UserProfile {
  id: string;
  name: string;
  email: string;
  instituteName?: string;
  roll?: number;
  semester?: string;
  shift?: string;
  role?: string;
  imageUrl?: string;
  imagePublicId?: string;
  activeStatus?: string;
  emailVerified?: boolean;
  createdAt?: string;
}
