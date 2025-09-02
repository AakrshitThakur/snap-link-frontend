import { CircleX } from "lucide-react";
import type { CreateContent } from "../../../custom-types/content.type";

type TagChipProps = {
  label: string;
  form: CreateContent;
  setForm: React.Dispatch<React.SetStateAction<CreateContent>>;
};

// will create a global state for this later to avoid props drilling
export function TagChipDelete({ label, form, setForm }: TagChipProps) {
  function deleteExistingTag() {
    const filterTags = form.tags.filter((t) => t !== label);
    setForm((curr) => ({ ...curr, tags: filterTags }));
  }

  return (
    <span className="inline-flex color-primary color-primary-content items-center gap-1 rounded-full pl-2.5 pr-1 py-1 text-xs font-medium">
      {label}
      <CircleX onClick={deleteExistingTag} className="cursor-pointer h-5 w-5" />
    </span>
  );
}
