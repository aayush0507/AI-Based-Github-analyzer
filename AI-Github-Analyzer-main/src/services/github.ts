import { GitHubProfile, GitHubRepository } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubService {
  private static async fetchWithErrorHandling(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('GitHub profile not found');
        }
        if (response.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch from GitHub API');
    }
  }

  static async getProfile(username: string): Promise<GitHubProfile> {
    const url = `${GITHUB_API_BASE}/users/${username}`;
    return await this.fetchWithErrorHandling(url);
  }

  static async getRepositories(username: string): Promise<GitHubRepository[]> {
    const url = `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=30`;
    return await this.fetchWithErrorHandling(url);
  }

  static extractUsernameFromUrl(url: string): string {
    try {
      // Handle various GitHub URL formats
      const patterns = [
        /github\.com\/([^\/\?]+)/i,
        /^([^\/\s]+)$/
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }

      throw new Error('Invalid GitHub URL format');
    } catch (error) {
      throw new Error('Please enter a valid GitHub profile URL or username');
    }
  }
}