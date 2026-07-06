import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function ProjectCard({ project }) {
  // Use cardImages if provided, otherwise fall back to thumbnail
  const images = project.cardImages?.length ? project.cardImages : [project.thumbnail];
  const [currentIdx, setCurrentIdx] = useState(0);
  const intervalRef = useRef(null);

  // Auto-cycle images every 1.8s when there are multiple
  useEffect(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 1800);
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  return (
    <Link
      to={`/projects/${encodeURIComponent(project.id)}`}
      className="group block bg-(--surface) rounded-lg overflow-hidden border border-(--bordercolor) hover:border-(--accent) transition-all duration-300">

      {/* Thumbnail carousel */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.title} ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:scale-105 transition-transform duration-300 ${
              i === currentIdx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Dot indicators for multi-image */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all duration-300 ${
                  i === currentIdx ? "w-3 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-(--overlay) opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="text-(--text) font-semibold">Bekijk Project →</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-(--text) mb-1 group-hover:text-(--accent) transition-colors">{project.title}</h3>
        <p className="text-sm text-(--muted) line-clamp-2">{project.tagline}</p>

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