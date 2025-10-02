export default function Error({ text }: { text: string }) {
  return (
    <section id="error" className="color-base-200 color-base-content rounded-lg flex flex-col justify-center items-center gap-1 p-2">
      <img src="/images/ui/error.png" className="w-40 h-auto" alt="Error image" />
      <p className="text-center text-base">{text}</p>
    </section>
  );
}
