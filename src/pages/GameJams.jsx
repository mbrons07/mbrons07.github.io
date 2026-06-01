import projectData from "../data/projectdata.json";
import ProjectCard from "../components/ProjectCard";

export default function GameJams() {
  // Filter projects that have the "Game Jam" tag
  const gameJamProjects = projectData.projects.filter((project) =>
    project.tags.includes("Game Jam")
  );

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-(--text) mb-4 text-center">Game Jams</h1>
        <p className="text-lg text-(--muted) mb-12 text-center max-w-2xl mx-auto">
          Een verzameling van projecten gemaakt tijdens verschillende game jams. 
          Snel prototypes bouwen, experimenteren met nieuwe mechanics en creatief zijn onder tijdsdruk.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameJamProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
