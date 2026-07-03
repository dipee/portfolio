import { unstable_cache } from "next/cache";
import { siteConfig } from "@/lib/site";

export type GithubStats = {
  repoCount: number;
  followers: number;
  mergedPrs: number;
};

const fallback: GithubStats = {
  repoCount: 36,
  followers: 14,
  mergedPrs: 5,
};

async function fetchGithubStats(): Promise<GithubStats> {
  const username = siteConfig.githubUsername;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "dipendra-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, prsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        cache: "no-store",
      }),
      fetch(
        `https://api.github.com/search/issues?q=${encodeURIComponent(
          `type:pr author:${username} is:merged`,
        )}`,
        {
          headers,
          cache: "no-store",
        },
      ),
    ]);

    if (!userRes.ok || !prsRes.ok) return fallback;

    const user = (await userRes.json()) as {
      public_repos?: number;
      followers?: number;
    };
    const prs = (await prsRes.json()) as { total_count?: number };

    return {
      repoCount: user.public_repos ?? fallback.repoCount,
      followers: user.followers ?? fallback.followers,
      mergedPrs: prs.total_count ?? fallback.mergedPrs,
    };
  } catch {
    return fallback;
  }
}

export const getGithubStats = unstable_cache(fetchGithubStats, ["github-stats"], {
  revalidate: 3600,
});
