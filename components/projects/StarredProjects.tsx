import React from "react";

// This component expects a server-side fetch to pass projects as props.
export default function StarredProjects({ projects }: { projects: { name: string; url: string; stars: number }[] }) {
  return (
    <aside>
      <h3>Starred projects</h3>
      <ul>
        {projects.map((p) => (
          <li key={p.url}>
            <a href={p.url} target="_blank" rel="noreferrer">{p.name}</a>
            <span className="ml-2 text-xs">⭐ {p.stars}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
