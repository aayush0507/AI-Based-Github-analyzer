// src/components/AuthForm.tsx
import React, { useState } from 'react';
import { Mail, Lock, User, Github } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', displayName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp, signInWithGoogle, configError } = useAuth();

  if (configError) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <Github className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Firebase Configuration Missing</h2>
        <p className="text-sm text-red-600 mb-4">{configError}</p>
        <ol className="list-decimal list-inside text-xs text-left text-red-700 space-y-1 mb-4">
          <li>Create Firebase Project</li>
          <li>Enable Email/Password & Google Auth</li>
          <li>Copy config to `useAuth.ts`</li>
          <li>Restart your dev server</li>
        </ol>
        <button onClick={() => window.location.href = '/dashboard'} className="bg-blue-600 text-white px-4 py-2 rounded">
          Continue Without Auth
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.displayName);
      }
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <div className="text-center mb-6">
          <Github className="w-10 h-10 mx-auto text-blue-600" />
          <h2 className="text-2xl font-bold">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
          <p className="text-sm text-gray-500">{isLogin ? 'Access your AI dashboard' : 'Create your GitHub analyzer account'}</p>
        </div>

        {error && <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="displayName"
                placeholder="Display Name"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-md"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="text-center my-4 text-sm text-gray-600">or</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100"
        >
          Continue with Google
        </button>

        <div className="text-center mt-6 text-sm">
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline">
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
