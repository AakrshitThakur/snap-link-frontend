import {
  File,
  Video,
  Image,
  Headphones,
  Newspaper,
  Globe,
  MoreHorizontal,
  Search,
} from "lucide-react";

const CONTENT_TYPE: string[] = [
  "document",
  "image",
  "video",
  "audio",
  "article",
  "website",
  "others",
];

const FILTER_CONTENTS = {
  all: Globe,
  documents: File,
  images: Image,
  videos: Video,
  audios: Headphones,
  articles: Newspaper,
  websites: Search,
  others: MoreHorizontal,
};

const CONTENT_TYPE_MAX_LENGTH = 25;

export { CONTENT_TYPE, CONTENT_TYPE_MAX_LENGTH, FILTER_CONTENTS };
