import type { ContentType } from "../custom-types/content.type";
function capitalizeFirstChar(str: string): string {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

function getContentTypeColor(contentType: ContentType): string {
  switch (contentType) {
    case "document":
      return "bg-[#1e88e5]";
    case "image":
      return "bg-[#fb8c00]";
    case "video":
      return "bg-[#e53935]";
    case "article":
      return "bg-[#00897b]";
    case "audio":
      return "bg-[#8e24aa]";
    case "others":
      return "bg-[#757575]";
  }
}

export { capitalizeFirstChar, getContentTypeColor };
