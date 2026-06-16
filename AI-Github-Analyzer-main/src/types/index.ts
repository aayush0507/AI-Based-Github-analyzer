export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface GitHubProfile {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location?: string;
  blog?: string;
  company?: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  homepage?: string;
  topics: string[];
}

export interface AIFeedback {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  overall_score: number;
  summary: string;
}

export interface AnalysisResult {
  profile: GitHubProfile;
  repositories: GitHubRepository[];
  feedback: AIFeedback;
  analyzedAt: Date;
}