import { GitHubProfile, GitHubRepository, AIFeedback } from '../types';

export class AIService {
  /**
   * Call backend AI endpoint to generate feedback for a GitHub profile
   */
  static async generateFeedback(
    profile: GitHubProfile,
    repositories: GitHubRepository[]
  ): Promise<AIFeedback> {
    try {
      // Using Vite proxy: frontend on 5173 calls /api, automatically forwarded to backend 5000
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, repositories }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI feedback from backend');
      }

      const data: AIFeedback = await response.json();
      return data;
    } catch (error) {
      console.error('AI analysis error (frontend):', error);
      return this.generateFallbackFeedback(profile, repositories);
    }
  }

  /**
   * Fallback analysis if backend AI call fails
   */
  private static generateFallbackFeedback(
    profile: GitHubProfile,
    repositories: GitHubRepository[]
  ): AIFeedback {
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const suggestions: string[] = [];

    // Profile checks
    if (profile.bio) strengths.push('Has a professional bio');
    else weaknesses.push('Missing profile bio');

    if (profile.public_repos > 5) strengths.push('Good number of public repositories');
    else weaknesses.push('Limited number of public repositories');

    // Repository checks
    if (repositories.some(repo => repo.description)) {
      strengths.push('Some repositories have descriptions');
    } else {
      weaknesses.push('Most repositories lack descriptions');
    }

    // Generic suggestions
    suggestions.push('Add detailed README files to your top repositories');
    suggestions.push('Include live demo links in your project descriptions');
    suggestions.push('Pin your best repositories to showcase your skills');
    suggestions.push('Add topics/tags to your repositories for better discoverability');

    return {
      strengths,
      weaknesses,
      suggestions,
      overall_score: Math.min(
        85,
        Math.max(45, profile.public_repos * 5 + (profile.bio ? 20 : 0))
      ),
      summary:
        'Basic analysis completed. For detailed AI insights, please configure the backend AI endpoint.',
    };
  }
}
