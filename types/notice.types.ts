export type NoticeVisibility = "PUBLIC" | "PRIVATE";

export interface Notice {
  id: string;
  title: string;
  description: string;
  visibility: NoticeVisibility;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: string;
    name: string;
  };
}

export interface CreateNoticePayload {
  title: string;
  description: string;
  visibility?: NoticeVisibility;
}

export interface UpdateNoticePayload {
  title?: string;
  description?: string;
  visibility?: NoticeVisibility;
}

export interface NoticeApiResponse {
  success: boolean;
  data: Notice[];
  message?: string;
}
