import type { LucideProps } from "lucide-react";

type LucideIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

interface FloatingIconsProps {
  position: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  icon: LucideIcon;
}

export default function FloatingIcons(props: FloatingIconsProps) {
  const { top, right, bottom, left } = props.position;
  console.log({
    top: top + "vh",
    right: right + "vw",
    bottom: bottom + "vh",
    left: left + "vw",
  });
  return (
    <section
      id="floating-icons"
      style={{
        top: top + "vh",
        right: right + "vw",
        bottom: bottom + "vh",
        left: left + "vw",
      }}
      className="absolute z-0 floating-icon color-accent color-accent-content w-8 h-auto p-2 rounded-full"
    >
      <props.icon className="w-full h-full" />
    </section>
  );
}
