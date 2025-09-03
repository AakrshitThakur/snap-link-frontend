import { TAG_REGEX } from "../constants/content.constant";
import type {
  CreateContent,
  ContentType,
  CreateContentErrors,
} from "../custom-types/content.type";

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
    case "website":
      return "bg-[#43a047]";
    case "others":
      return "bg-[#757575]";
  }
}

// create content validation
function validateCreateContent(
  form: CreateContent
): CreateContentErrors | boolean {
  let gotErrors = false;
  const errors: CreateContentErrors = {
    title: "",
    url: "",
    tags: "",
  };

  // validating title field
  if (!TAG_REGEX.test(form.title)) {
    errors.title =
      "Title must be at least 2 characters long and contain only letters, numbers, or underscores.";
    gotErrors = true;
  }

  // validating URL field
  try {
    new URL(form.url);
  } catch (error) {
    if (error instanceof TypeError) {
      errors.url = "Invalid url format";
    } else if (error instanceof Error) {
      errors.url = error.message;
    }
    gotErrors = true;
  }

  // validating tags field
  for (const t of form.tags) {
    if (!TAG_REGEX.test(t)) {
      errors.tags =
        "Title must be at least 2 characters long and contain only letters, numbers, or underscores.";
      gotErrors = true;
    }
  }

  // return all the errors
  if (!gotErrors) return false;
  return errors;
}

export { capitalizeFirstChar, getContentTypeColor, validateCreateContent };
