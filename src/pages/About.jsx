import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { siteConfig } from "../siteConfig";

export default function About() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl flex flex-col md:flex-row gap-12 items-start">
        {/* Profile Image */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <img
            src={siteConfig.aboutImage}
            alt={siteConfig.name}
            className="w-52 h-52 rounded-full object-cover border-4 border-(--accent) shadow-lg"
          />
          <p className="text-(--accent) font-semibold text-sm tracking-wide">{siteConfig.name}</p>
        </div>

        {/* About Text */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-(--text) mb-6">{tr.about.title}</h1>
          <p className="text-lg text-(--muted) leading-relaxed">{tr.about.body}</p>
        </div>
      </div>
    </main>
  );
}