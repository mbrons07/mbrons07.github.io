import { siteConfig } from "../siteConfig";
import ProjectCard from "../components/ProjectCard";
import projectData from "../data/projectdata.json";

export default function Home() {
  // Haal projects array uit de JSON
  const projects = projectData.projects; 

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        
        {/* Decoratieve glow achter foto */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-(--accent) rounded-full blur-3xl opacity-20"/>
        
        {/* Informatie */}
        <div className="container mx-auto flex flex-col items-center text-center relative z-10">
          
          {/* Profielfoto */}
          <img
            src={siteConfig.aboutImage}
            alt={siteConfig.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-(--accent) shadow-lg mb-6"
          />

          {/* Naam en rol */}
          <h1 className="text-5xl font-bold text-(--text) mb-2">{siteConfig.name}</h1>
          <p className="text-xl text-(--accent) font-medium mb-4">{siteConfig.role}</p>
          
          {/* Tagline */}
          <p className="text-lg text-(--muted) max-w-xl mb-8">{siteConfig.tagline}</p>
        </div>
      </section>
              {/* Projecten Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-(--text) mb-8 text-center">M-mijn Projecten... K-kijk er niet te lang naar!</h2>

          {/* Grid met ProjectCards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}