import { Github, Linkedin, Handshake } from "lucide-react";

export default function SocialLinks() {
  return (
    <section id="social-links" className="flex-1 space-y-1">
      <div>
        <a
          href="/signup"
          className="hover-color flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
        >
          <Github strokeWidth={1} className="h-5 w-5" />
          <span className="text-sm font-medium">GitHub</span>
        </a>
        <a
          href="/signin"
          className="hover-color flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
        >
          <Linkedin strokeWidth={1} className="h-5 w-5" />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
        <a
          href="/signin"
          className="hover-color flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
        >
          <Handshake strokeWidth={1} className="h-5 w-5" />
          <span className="text-sm font-medium">Contribute?</span>
        </a>
      </div>
    </section>
  );
}
