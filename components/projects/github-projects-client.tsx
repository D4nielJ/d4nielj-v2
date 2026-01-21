import { GitHubRepo } from "@/storage/schema/github";
import { GitHubProjectCard } from "./github-project-card";
import { fetchGitHubRepos } from "@/lib/github";

interface GitHubProjectsClientProps {
  title: string;
}

export async function GitHubProjectsClient({
  title,
}: GitHubProjectsClientProps) {
  let repos: GitHubRepo[] = [];
  try {
    repos = await fetchGitHubRepos({ count: 6 });
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return null;
  }

  if (repos.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {repos.map((repo) => (
          <GitHubProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
