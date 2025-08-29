import { infoNotification } from "../../../utils/toast.utils";
type TagChipProps = {
  label: string;
};

export function TagChip({ label }: TagChipProps) {
  return (
    <span
      onClick={() =>
        infoNotification("bkjbkjbkjjkbkbkjbkjb")
      }
      className="inline-flex color-primary color-primary-content items-center rounded-full px-2.5 py-1 text-xs font-medium"
    >
      {label}
    </span>
  );
}
