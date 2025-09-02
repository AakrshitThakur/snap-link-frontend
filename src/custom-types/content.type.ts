type ContentType =
  | "document"
  | "image"
  | "video"
  | "audio"
  | "article"
  | "website"
  | "others";

interface Content {
  _id: string;
  type: ContentType; // extendable
  url: string;
  title: string;
  ownerId: string;
  tagIds: {
    title: string;
  }[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface GetAllContentApi {
  message: string;
  contents?: Content[];
}
interface ShareableContentsApi {
  message: string;
  username?: string;
  contents?: Content[];
}
interface UpdateContentApi {
  message: string;
  content?: Content;
}

interface CreateContent {
  title: string;
  url: string;
  type: ContentType;
  tags: string[];
}
interface ContentBasicApi {
  message: string;
}

interface CreateContentErrors {
  title: string;
  url: string;
  tags: string;
}

export type {
  Content,
  ContentType,
  UpdateContentApi,
  GetAllContentApi,
  CreateContent,
  ContentBasicApi,
  CreateContentErrors,
  ShareableContentsApi,
};
