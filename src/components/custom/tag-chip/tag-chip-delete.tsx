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
    <span className="inline-flex color-primary color-primary-content items-center rounded-full px-2.5 py-1 text-xs font-medium">
      {label}
    </span>
  );
}
