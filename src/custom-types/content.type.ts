type ContentType =
  | "document"
  | "image"
  | "video"
  | "audio"
  | "article"
  | "others";

interface Content {
  id: string;
  //   icon?: React.ReactNode;
  title: string;
  type: ContentType;
  url: string;
  tags: string[];
}

export type { Content, ContentType };
