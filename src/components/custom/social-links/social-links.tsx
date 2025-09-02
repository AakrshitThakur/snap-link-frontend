import { Github, Linkedin, Handshake } from "lucide-react";

export default function SocialLinks() {
  return (
    <section id="social-links" className="flex-1 space-y-1">
      <div>
        <a
          href="https://github.com/AakrshitThakur"
          className="hover-color flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
          target="_blank"
        >
          <Github strokeWidth={1} className="h-5 w-5" />
          <span className="text-sm font-medium">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/aakrshit-thakur-14433627b/"
          className="hover-color flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
          target="_blank"
        >
          <Linkedin strokeWidth={1} className="h-5 w-5" />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
        <a
          href="https://github.com/AakrshitThakur/snap-link-frontend"
          className="hover-color flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
          target="_blank"
        >
          <Handshake strokeWidth={1} className="h-5 w-5" />
          <span className="text-sm font-medium">Contribute?</span>
        </a>
      </div>
    </section>
  );
}
