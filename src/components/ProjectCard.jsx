import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

export default function ProjectCard({ project }) {
  const { lang } = useLang();
  const tr = t[lang];

  const title = lang === "en" ? project.title_en || project.title : project.title;
  const tagline = lang === "en" ? project.tagline_en || project.tagline : project.tagline;

  return (
    <Link
      to={`/projects/${encodeURIComponent(project.id)}`}
      className="group block bg-(--surface) rounded-lg overflow-hidden border border-(--bordercolor) hover:border-(--accent) transition-all duration-300">

      {/* Thumbnail met overlay */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <img src={project.thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-(--overlay) opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="text-(--text) font-semibold">{tr.project.viewProject}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-(--text) mb-1 group-hover:text-(--accent) transition-colors">{title}</h3>
        <p className="text-sm text-(--muted) line-clamp-2">{tagline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3 block pointer-events-none">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag pointer-events-auto">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}