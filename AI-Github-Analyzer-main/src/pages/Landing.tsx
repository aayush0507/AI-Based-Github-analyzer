import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Zap, Target, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

export const Landing: React.FC = () => {
  const features = [
    {
      icon: <Github className="w-8 h-8 text-blue-600" />,
      title: 'GitHub Integration',
      description: 'Seamlessly analyze any public GitHub profile with comprehensive data fetching.'
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: 'AI-Powered Analysis',
      description: 'Get intelligent feedback powered by Google Gemini AI for actionable insights.'
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: 'Professional Focus',
      description: 'Tailored recommendations to make your profile more appealing to recruiters.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: 'Growth Tracking',
      description: 'Identify areas for improvement and track your professional development.'
    }
  ];

  const benefits = [
    'Comprehensive profile analysis',
    'AI-generated actionable feedback',
    'Recruiter-focused recommendations',
    'Repository quality assessment',
    'Professional presentation tips',
    'Community engagement insights'
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Github className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Portfolio Analyzer AI</span>
            </div>
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Optimize Your GitHub Profile with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get comprehensive, AI-powered analysis of any GitHub profile. Receive actionable 
              feedback to make your repositories and profile more professional and appealing 
              to recruiters and collaborators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Free Analysis</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Professional Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leverage cutting-edge AI technology to transform your GitHub presence 
              and accelerate your career opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What You'll Get from Our Analysis
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our comprehensive analysis provides detailed insights into your GitHub 
                profile, helping you understand how recruiters and collaborators perceive 
                your work and what improvements will have the biggest impact.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Profile Strengths</h4>
                    <p className="text-gray-600 text-sm">Identify what you're doing well</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Improvement Areas</h4>
                    <p className="text-gray-600 text-sm">Spot weaknesses and gaps</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Actionable Suggestions</h4>
                    <p className="text-gray-600 text-sm">Get specific next steps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your GitHub Profile?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who have improved their professional presence 
            with our AI-powered analysis. Start your free analysis today.
          </p>
          <Link
            to="/auth"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Github className="w-6 h-6" />
              <span className="text-lg font-semibold">Portfolio Analyzer AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Portfolio Analyzer AI. Built with React, Tailwind CSS, and Google Gemini AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};