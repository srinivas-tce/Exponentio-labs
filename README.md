# Exponentio Labs Platform - Next.js Version

A comprehensive innovation platform with advanced lab equipment access and cutting-edge technology solutions, built with Next.js 14 for optimal SEO and performance.

## 🚀 Features

### Core Platform
- **Professional Network Management**: Connect skilled professionals with employers
- **Advanced Lab Equipment**: Access to AR/VR, Robotics, AI, and IDEA Lab equipment
- **Real-time Messaging**: Built-in communication system
- **Job Posting & Application**: Complete job lifecycle management
- **User Profiles**: Comprehensive profile management with skills and ratings

### Lab Equipment Categories
- **AR/VR Equipment**: Meta Quest 3, Leap Motion Controllers, XREAL devices
- **Robotics**: Intel RealSense cameras, quadruped robots, robotic arms
- **Fullstack Development**: High-performance workstations, monitors
- **Embedded Systems**: STM32 boards, ESP32, development kits
- **Agentic AI**: NVIDIA Jetson, AI accelerators, simulation software
- **IDEA Lab**: Laser cutters, 3D printers, CNC machines, PCB fabrication

### Technical Features
- **SEO Optimized**: Built with Next.js 14 for excellent search engine visibility
- **Server-Side Rendering**: Fast initial page loads
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: Secure user authentication and session management
- **Real-time Updates**: Dynamic content updates without page refresh

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Context API with localStorage
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── jobs/              # Job-related pages
│   │   └── [id]/
│   ├── products/          # Equipment pages
│   ├── profile/           # User profile
│   ├── messages/          # Messaging system
│   ├── post-job/         # Job posting
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HomePage.tsx
│   ├── BackgroundVideo.tsx
│   ├── ContactForm.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── JobsPage.tsx
│   ├── JobDetailsPage.tsx
│   ├── PostJobPage.tsx
│   ├── ProfilePage.tsx
│   ├── MessagesPage.tsx
│   └── ProductsPage.tsx
├── context/               # React Context
│   └── AuthContext.tsx
└── lib/                   # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd exponentio_labs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Pages & Features

### Home Page (`/`)
- Hero section with background video
- Company carousel with real logos
- Statistics display with animated circles
- Service categories and benefits
- Client testimonials
- MVP application contact form

### Authentication (`/login`, `/register`)
- Secure user authentication
- Form validation and error handling
- Responsive design for all devices

### Jobs (`/jobs`)
- Browse available gig opportunities
- Advanced search and filtering
- Job details with application process
- Company information and ratings

### Equipment (`/products`)
- Comprehensive lab equipment catalog
- Category-based filtering (AR/VR, Robotics, AI, etc.)
- Grid and list view options
- Equipment specifications and pricing
- Request system for equipment access

### User Profile (`/profile`)
- Personal information management
- Skills and experience tracking
- Profile statistics and achievements
- Quick action buttons

### Messaging (`/messages`)
- Real-time conversation interface
- Message history and search
- Online status indicators
- File sharing capabilities

### Job Posting (`/post-job`)
- Create and manage job postings
- Detailed job information forms
- Application tracking
- Employer dashboard

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Green (#10B981)
- Accent: Purple (#8B5CF6)
- Neutral: Gray scale

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold weights (700-800)
- Body: Regular weight (400)

### Components
- Consistent spacing using Tailwind utilities
- Responsive grid layouts
- Interactive hover states
- Loading states and animations

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your-api-url
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations for carousel
- Responsive breakpoints
- Component-specific utilities

## 📈 SEO Features

- **Metadata**: Comprehensive meta tags for all pages
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: Rich snippets for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with Next.js static export
- **AWS**: Use AWS Amplify or custom server setup
- **Docker**: Containerized deployment option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@gig4u.co
- Documentation: [Project Wiki](link-to-wiki)
- Issues: [GitHub Issues](link-to-issues)

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Video calling integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered job matching
- [ ] Blockchain-based payments
- [ ] Multi-language support
- [ ] Advanced equipment booking system

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**