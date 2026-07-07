import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ProjectMechanics({ project }) {
  // Skip als er geen mechanics zijn
  if (!project.mechanics || project.mechanics.length === 0) {
    return null;
  }

  return (
    <div className="mx-4">
      <h2 className="text-xl font-semibold text-(--text) mb-4">Code Highlights</h2>

      {project.mechanics.map((m, i) => {
        const imgUrl = m.blueprint || m.image;
        const isNowYouDye = project.id === "now you dye";

        const codeBlock = (
          <div className="h-60 overflow-auto rounded-lg">
            <SyntaxHighlighter
              language="csharp"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: "0.5rem",
                fontSize: "1rem",
                height: "100%",
              }}
              showLineNumbers={true}>
              {m.code}
            </SyntaxHighlighter>
          </div>
        );

        const imgBlock = imgUrl && (
          <a href={imgUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={imgUrl}
              alt={m.subtitle}
              className="w-full h-60 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            />
          </a>
        );

        return (
          <div key={i} className="flex flex-col gap-4 border-b border-(--bordercolor) pb-4 mb-4">
            {/* Title + Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-(--text)">{m.subtitle}</h3>
              <p className="leading-relaxed text-(--muted)">{m.description}</p>
            </div>

            {/* Code + Image Grid */}
            <div className={`grid grid-cols-1 ${imgUrl ? 'md:grid-cols-[65%_35%]' : ''} gap-4`}>
              {isNowYouDye && imgUrl ? (
                <>
                  {/* Swap order for Now You Dye: Image/Blueprint on the left, Code on the right */}
                  {imgBlock}
                  {codeBlock}
                </>
              ) : (
                <>
                  {/* Default: Code on the left, Image/Blueprint on the right */}
                  {codeBlock}
                  {imgBlock}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}