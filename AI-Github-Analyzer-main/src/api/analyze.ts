// src/api/analyze.ts

// 1️⃣ Helper: fetch GitHub profile and repos
const fetchGitHubData = async (repoUrl: string) => {
  try {
    const username = repoUrl.split("github.com/")[1].split("/")[0];

    // Fetch user profile
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    if (!profileRes.ok) throw new Error("Failed to fetch GitHub profile");
    const profile = await profileRes.json();

    // Fetch user repositories
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!reposRes.ok) throw new Error("Failed to fetch GitHub repositories");
    const repositories = await reposRes.json();

    return { profile, repositories };
  } catch (err: unknown) {
    console.error("GitHub fetch error:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown GitHub fetch error");
  }
};

// 2️⃣ Main function: send data to backend AI route
export const analyzeRepo = async (repoUrl: string) => {
  try {
    const { profile, repositories } = await fetchGitHubData(repoUrl);

    const res = await fetch("http://localhost:5000/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, repositories }),
    });

    if (!res.ok) throw new Error("Backend AI request failed");

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    console.error("Analyze repo error:", err);
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "Unknown error" };
  }
};
