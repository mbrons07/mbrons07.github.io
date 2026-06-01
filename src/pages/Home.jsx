import { siteConfig } from "../siteConfig";
import ProjectCard from "../components/ProjectCard";
import projectData from "../data/projectdata.json";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

export default function Home() {
  const { lang } = useLang();
  const tr = t[lang];
  const projects = projectData.projects;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-(--accent) rounded-full blur-3xl opacity-20"/>
        <div className="container mx-auto flex flex-col items-center text-center relative z-10">
          <img
            src={siteConfig.aboutImage}
            alt={siteConfig.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-(--accent) shadow-lg mb-6 animate-bounce-around"
          />
          <h1 className="text-5xl font-bold text-(--text) mb-2">{siteConfig.name}</h1>
          <p className="text-xl text-(--accent) font-medium mb-4">{tr.site.role}</p>
          <p className="text-lg text-(--muted) max-w-xl mb-8">{tr.site.tagline}</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-(--text) mb-8 text-center">{tr.home.myProjects}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-(--text) mb-8">{tr.home.gameJams}</h2>
            <div
              className="max-w-md mx-auto p-8 rounded-2xl bg-(--card-bg) border border-(--border) hover:border-(--accent) transition-all cursor-pointer group"
              onClick={() => (window.location.hash = "#/gamejams")}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🕹️</div>
              <h3 className="text-2xl font-bold mb-2">{tr.home.gameJams}</h3>
              <p className="text-(--muted)">{tr.home.gameJamsDesc}</p>
              <div className="mt-4 text-(--accent) font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
                {tr.home.viewAll} <span className="ml-2">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}