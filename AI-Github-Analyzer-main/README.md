# GitHub Portfolio Analyzer AI

A full-stack web application that uses AI to analyze GitHub profiles and provide actionable feedback for professional improvement.

## 🚀 Features

- **Modern Landing Page**: Beautiful, responsive design with hero section and feature highlights
- **Firebase Authentication**: Secure sign-in/sign-up functionality
- **GitHub API Integration**: Comprehensive profile and repository data fetching
- **AI-Powered Analysis**: Google Gemini AI generates personalized feedback
- **Professional Dashboard**: Clean interface for viewing analysis results
- **Responsive Design**: Optimized for all device sizes

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Authentication**: Firebase Auth
- **APIs**: GitHub REST API, Google Gemini AI
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication and set up Email/Password provider
4. Get your Firebase config from Project Settings

### 3. Google Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key for configuration

### 4. Environment Configuration

1. Copy `.env.example` to `.env`
2. Fill in your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 5. Update Firebase Config

Update `src/config/firebase.ts` with your Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

### 6. Run the Application

```bash
npm run dev
```

## 🔧 Usage

1. **Landing Page**: View features and benefits
2. **Sign Up/Sign In**: Create account or log in
3. **Analyze Profile**: Enter any GitHub username or URL
4. **View Results**: Get comprehensive AI-powered feedback

## 📱 Features Breakdown

### Profile Analysis
- Repository quality assessment
- Documentation evaluation
- Professional presentation review
- Community engagement analysis

### AI Feedback Categories
- **Strengths**: What you're doing well
- **Weaknesses**: Areas needing improvement
- **Suggestions**: Actionable recommendations
- **Overall Score**: Professional rating out of 100

### GitHub Data Points
- Profile information and bio
- Repository count and quality
- Contribution patterns
- Code diversity and languages
- Recent activity and maintenance

## 🎨 Design Principles

- **Clean & Modern**: Apple-level design aesthetics
- **Professional Colors**: Blue, purple, and green color scheme
- **Responsive**: Mobile-first design approach
- **Accessible**: High contrast ratios and proper semantic HTML
- **Animated**: Smooth transitions and hover effects

## 🔒 Security

- Firebase Authentication for secure user management
- Environment variables for sensitive API keys
- Client-side only - no backend server required
- Rate limiting handled by GitHub API

## 📈 Performance

- Vite for fast development and builds
- Lazy loading for optimal bundle size
- Efficient API calls with error handling
- Responsive images and optimized assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.