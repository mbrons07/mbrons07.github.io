import { useParams } from "react-router-dom";
import projectData from "../data/projectdata.json";
import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectInfo from "../components/projects/ProjectInfo";
import ProjectGallery from "../components/projects/ProjectGallery";
import ProjectMechanics from "../components/projects/ProjectMechanics";
import ProjectPrevNext from "../components/projects/ProjectPrevNext";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

export default function ProjectPage() {
    const { projectId } = useParams();
    const { lang } = useLang();
    const tr = t[lang];

    const project = projectData.projects.find(p => p.id === projectId);

    if (!project) {
        return <div className="container mx-auto px-4 py-12 text-center">{tr.project.notFound}</div>;
    }

    // Find previous and next projects (with looping)
    const currentIndex = projectData.projects.findIndex(p => p.id === projectId);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : projectData.projects.length - 1;
    const nextIndex = currentIndex < projectData.projects.length - 1 ? currentIndex + 1 : 0;
    
    const prevProjRaw = projectData.projects[previousIndex];
    const nextProjRaw = projectData.projects[nextIndex];

    const previousProject = { 
        title: lang === "en" ? prevProjRaw.title_en || prevProjRaw.title : prevProjRaw.title, 
        url: `/projects/${prevProjRaw.id}` 
    };
    const nextProject = { 
        title: lang === "en" ? nextProjRaw.title_en || nextProjRaw.title : nextProjRaw.title, 
        url: `/projects/${nextProjRaw.id}` 
    };

    return (
        <div>
            <ProjectHeader project={project} />
            <ProjectInfo project={project} />
            <ProjectMechanics project={project} />
            <ProjectGallery project={project} />
            <ProjectPrevNext previous={previousProject} next={nextProject} />
        </div>   
    );   
}
