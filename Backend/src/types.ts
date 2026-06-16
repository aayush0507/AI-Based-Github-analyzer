export interface GitHubProfile {
  login: string;
  name?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  location?: string;
  company?: string;
  blog?: string;
}

export interface GitHubRepository {
  name: string;
  description?: string;
  language?: string;
  stargazers_count: number;
  topics?: string[];
}

export interface AIFeedback {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  overall_score: number;
  summary: string;
}
