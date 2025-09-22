#!/bin/bash

# Push Gig4U Project to GitHub Repository

echo "🚀 Pushing Gig4U project to GitHub..."

# Initialize Git repository
echo "📁 Initializing Git repository..."
git init

# Add all files to staging
echo "📝 Adding files to staging..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Gig4U platform with React

✨ Features:
- Hero section with background video
- Company carousel with real logos  
- Statistics circles display
- Service categories and benefits
- Client testimonials
- Blog section with images
- Contact form for MVP applications
- Responsive design
- Authentication system
- Modern UI/UX design

🛠️ Tech Stack:
- React 18 with hooks
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Context API for state management
- Local Storage for persistence

📱 Responsive Design:
- Mobile-first approach
- Tablet and desktop optimized
- Cross-browser compatibility"

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin https://github.com/srinivas-tce/Exponentio-labs.git

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo "🔗 Repository: https://github.com/srinivas-tce/Exponentio-labs.git"
echo ""
echo "🎉 Your Gig4U project is now live on GitHub!"
