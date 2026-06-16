import { callOpenRouterAI } from '../ai/openrouter.js';
import { GitHubProfile, GitHubRepository, AIFeedback } from '../types.js';

export class AIService {
  static async generateFeedback(profile: GitHubProfile, repositories: GitHubRepository[]): Promise<AIFeedback> {
    try {
      const repoSummary = repositories.slice(0, 10).map(repo => ({
        name: repo.name,
        description: repo.description || 'No description',
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics || []
      }));

      const prompt = `
Analyze this GitHub profile for professional appeal:

PROFILE:
- Username: ${profile.login}
- Name: ${profile.name || 'Not provided'}
- Bio: ${profile.bio || 'No bio'}
- Public Repos: ${profile.public_repos}
- Followers: ${profile.followers}
- Location: ${profile.location || 'Not provided'}
- Company: ${profile.company || 'Not provided'}
- Website: ${profile.blog || 'Not provided'}

TOP REPOSITORIES: ${JSON.stringify(repoSummary, null, 2)}

Return JSON:
{
  "strengths": ["str1", "str2"],
  "weaknesses": ["wk1", "wk2"],
  "suggestions": ["sg1","sg2"],
  "overall_score": 85,
  "summary": "Brief assessment"
}
`;

      const result = await callOpenRouterAI([{ role: 'user', content: prompt }]);
      const cleanText = result.text.replace(/```json|```/g, '').trim();
      const parsed: AIFeedback = JSON.parse(cleanText);

      return parsed;
    } catch (error) {
      console.error('AIService error:', error);
      return this.generateFallbackFeedback(profile, repositories);
    }
  }

  private static generateFallbackFeedback(profile: GitHubProfile, repositories: GitHubRepository[]): AIFeedback {
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const suggestions: string[] = [];

    if (profile.bio) strengths.push('Has a professional bio');
    else weaknesses.push('Missing profile bio');

    if (profile.public_repos > 5) strengths.push('Good number of public repositories');
    else weaknesses.push('Limited number of public repositories');

    if (repositories.some(repo => repo.description)) strengths.push('Some repositories have descriptions');
    else weaknesses.push('Most repositories lack descriptions');

    suggestions.push('Add detailed README files');
    suggestions.push('Include live demo links');
    suggestions.push('Pin best repositories');
    suggestions.push('Add topics/tags');

    return {
      strengths,
      weaknesses,
      suggestions,
      overall_score: Math.min(85, Math.max(45, profile.public_repos * 5 + (profile.bio ? 20 : 0))),
      summary: 'Basic analysis completed. Configure AI API for full insights.'
    };
  }
}
