import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Github, Search, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AnalysisResults } from '../components/AnalysisResults';
import { GitHubService } from '../services/github';
import { analyzeRepo } from '../api/analyze';
import { AnalysisResult } from '../types';

export const Dashboard: React.FC = () => {
  const { user, loading: authLoading, configError } = useAuth();
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  if (!user && !configError) {
    return <Navigate to="/auth" replace />;
  }

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Extract GitHub username
      const username = GitHubService.extractUsernameFromUrl(githubUrl.trim());

      // Fetch profile and repositories
      const [profile, repositories] = await Promise.all([
        GitHubService.getProfile(username),
        GitHubService.getRepositories(username)
      ]);

      // Call frontend analyze API
      const feedbackResult = await analyzeRepo(githubUrl.trim());

      setResult({
        profile,
        repositories,
        feedback: feedbackResult.feedback || feedbackResult,
        analyzedAt: new Date()
      });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setGithubUrl('');
    setError('');
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50">
        {!configError && <Header />}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <AnalysisResults result={result} onNewAnalysis={handleNewAnalysis} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!configError && <Header />}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        {configError && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Demo Mode</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Firebase authentication is not configured. You can still analyze GitHub profiles, 
                    but user accounts and data persistence are not available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Github className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Analyze GitHub Profile
            </h1>
            <p className="text-gray-600">
              Enter any public GitHub profile URL to get AI-powered professional feedback
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Analysis Failed</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleAnalysis} className="space-y-6">
              <div>
                <label htmlFor="github-url" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Profile URL or Username
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="github-url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/username or just username"
                    disabled={loading}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Examples: "octocat" or "https://github.com/octocat"
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !githubUrl.trim()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <LoadingSpinner size="sm" text="" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Analyze Profile</span>
                  </>
                )}
              </button>
            </form>

            {loading && (
              <div className="mt-8 text-center">
                <LoadingSpinner text="Analyzing GitHub profile and generating AI feedback..." />
                <p className="text-sm text-gray-500 mt-4">
                  This may take a few moments while we fetch your data and generate insights.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">What We Analyze:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Profile completeness and professional presentation</li>
              <li>• Repository quality, documentation, and organization</li>
              <li>• Code diversity and recent activity patterns</li>
              <li>• Community engagement and collaboration indicators</li>
              <li>• Overall appeal to recruiters and hiring managers</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
