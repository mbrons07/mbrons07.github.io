import { useLang } from "../../context/LanguageContext";
import { t } from "../../translations";

export default function ProjectInfo({ project }) {
  const { lang } = useLang();
  const tr = t[lang];

  const description = lang === "en" ? project.description_en || project.description : project.description;
  const projectRole = lang === "en" ? project.projectRole_en || project.projectRole : project.projectRole;
  const timeline = lang === "en" ? project.timeline_en || project.timeline : project.timeline;

  const paragraphs = description.split("\n\n");

  return (
    <div className="mb-4 border-b border-(--bordercolor) pb-8 ml-4 mr-4">
      {/* Grid layout: 2 columns on desktop, stacks on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description - takes 2 columns on desktop */}
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-xl font-semibold text-(--text)">{tr.project.about}</h2>

          {/* Render each paragraph separately for better spacing */}
          {paragraphs.map((text, i) => (
            <p key={i} className="leading-relaxed text-(--muted)">
              {text}
            </p>
          ))}
        </div>

        {/* Project details sidebar */}
        <div className="h-fit md:self-start">
          <h3 className="text-xl font-semibold mb-4 text-(--text) border-b border-(--bordercolor) pb-2">{tr.project.details}</h3>

          <ul className="text-sm space-y-2 text-(--muted)">
            <li className="flex justify-between border-b border-(--bordercolor) pb-1">
              <span className="font-medium text-(--text)">{tr.project.role}</span>
              <span>{projectRole}</span>
            </li>

            <li className="flex justify-between border-b border-(--bordercolor) pb-1">
              <span className="font-medium text-(--text)">{tr.project.timeline}</span>
              <span>{timeline}</span>
            </li>

            <li className="flex justify-between items-center pb-1">
              <span className="font-medium text-(--text)">{tr.project.tags}</span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          </ul>

          {/* Action buttons - shown if links exist */}
          {(project.git || project.itch) && (
            <div className="mt-4 flex gap-2 justify-end">
              {project.git && (
                <a href={project.git} target="_blank" rel="noopener noreferrer" 
                   className="px-3 py-2 bg-(--surface) border border-(--bordercolor) rounded-lg 
                              hover:border-(--accent) text-sm transition-colors">
                  GitHub
                </a>
              )}
              {project.itch && (
                <a href={project.itch} target="_blank" rel="noopener noreferrer"
                   className="px-3 py-2 bg-(--accent) text-(--accent-text) rounded-lg 
                              hover:bg-(--accent-hover) text-sm transition-colors">
                  Itch.io
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}