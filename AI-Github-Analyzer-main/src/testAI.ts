import { AIService } from './services/ai';
import { GitHubProfile, GitHubRepository } from './types';

(async () => {
  const profile: GitHubProfile = {
    login: 'exampleUser',
    name: 'John Doe',
    bio: 'Fullstack developer',
    public_repos: 10,
    followers: 50,
    location: 'India',
    company: 'Example Inc.',
    blog: 'https://example.com',
    avatar_url: 'https://example.com/avatar.png',
    html_url: 'https://github.com/exampleUser',
    following: 10,
    created_at: '2022-01-01T00:00:00Z',
  };

  const repositories: GitHubRepository[] = [
    {
      id: 1,
      name: 'repo1',
      full_name: 'exampleUser/repo1',
      html_url: 'https://github.com/exampleUser/repo1',
      description: 'My first repo',
      language: 'TypeScript',
      stargazers_count: 5,
      forks_count: 1,
      topics: ['vite', 'react'],
      created_at: '2022-02-01T00:00:00Z',
      updated_at: '2023-03-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'repo2',
      full_name: 'exampleUser/repo2',
      html_url: 'https://github.com/exampleUser/repo2',
      description: 'Another repo',
      language: 'JavaScript',
      stargazers_count: 2,
      forks_count: 0,
      topics: ['node', 'express'],
      created_at: '2022-05-01T00:00:00Z',
      updated_at: '2023-06-01T00:00:00Z',
    },
  ];

  const feedback = await AIService.generateFeedback(profile, repositories);
  console.log(feedback);
})();
