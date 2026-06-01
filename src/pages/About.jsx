import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

export default function About() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold text-(--text) mb-6">{tr.about.title}</h1>
        <p className="text-lg text-(--muted) leading-relaxed">{tr.about.body}</p>
      </div>
    </main>
  );
}