import React from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  Star, 
  Calendar, 
  Users, 
  GitBranch 
} from 'lucide-react';

import { AnalysisResult } from "../types";

interface AnalysisResultsProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onNewAnalysis }) => {
  const { profile, repositories = [], feedback } = result;

  const strengths = feedback?.strengths ?? [];
  const weaknesses = feedback?.weaknesses ?? [];
  const suggestions = feedback?.suggestions ?? [];
  const score = feedback?.overall_score ?? 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={profile?.avatar_url}
            alt={profile?.name || profile?.login}
            className="w-20 h-20 rounded-full"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {profile?.name || profile?.login}
            </h1>
            <p className="text-gray-600">@{profile?.login}</p>

            {profile?.bio && (
              <p className="text-gray-700 mt-2">{profile.bio}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
              {profile?.location && <span>📍 {profile.location}</span>}
              {profile?.company && <span>🏢 {profile.company}</span>}

              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {profile?.followers} followers
              </span>

              <span className="flex items-center gap-1">
                <GitBranch className="w-4 h-4" />
                {profile?.public_repos} repos
              </span>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-full font-semibold ${getScoreColor(score)}`}>
            Score: {score}/100
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">AI Analysis Summary</h2>
        <p className="text-gray-700 leading-relaxed">
          {feedback?.summary || "No summary available."}
        </p>
      </div>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Strengths */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
          </div>

          <ul className="space-y-3">
            {strengths.length > 0 ? (
              strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No strengths available.</p>
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Areas to Improve</h3>
          </div>

          <ul className="space-y-3">
            {weaknesses.length > 0 ? (
              weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No weaknesses available.</p>
            )}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Suggestions</h3>
          </div>

          <ul className="space-y-3">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No suggestions available.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Top Repositories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Repositories</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(repositories ?? []).slice(0, 6).map((repo) => (
            <div key={repo.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-blue-600 hover:text-blue-700">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>

                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Star className="w-4 h-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {repo.description || 'No description available'}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>{repo.language || 'Unknown'}</span>
                </span>

                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(repo.updated_at)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onNewAnalysis}
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Analyze Another Profile
        </button>
      </div>
    </div>
  );
};
