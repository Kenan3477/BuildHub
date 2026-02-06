# 🏗️ BuildHub - Construction Marketplace Platform

[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://buildhub-construction.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A modern, full-stack construction marketplace platform connecting homeowners with verified professionals across the UK. Built with Next.js 14, TypeScript, and cutting-edge web technologies.

## ✨ Features

### 🏠 **For Homeowners**
- **Smart Job Posting**: Create detailed project requirements with intelligent categorization
- **Professional Matching**: AI-powered contractor recommendations based on location, expertise, and ratings
- **Interactive UK Map**: Discover local professionals and visualize project distribution
- **Quote Comparison**: Compare multiple quotes side-by-side with detailed breakdowns
- **Secure Messaging**: Real-time communication with contractors
- **Payment Protection**: Secure payment processing with milestone-based releases

### 👷 **For Contractors**
- **Professional Profiles**: Showcase portfolios, certifications, and customer reviews
- **Lead Management**: Advanced lead scoring and intelligent job matching
- **Quote Builder**: Professional quote generation with customizable templates
- **Calendar Integration**: Project scheduling and availability management
- **Performance Analytics**: Track conversion rates, earnings, and customer satisfaction

### 🛡️ **Platform Features**
- **Verification System**: Multi-level professional verification (ID, insurance, certifications)
- **Review & Rating System**: Transparent feedback mechanism for quality assurance
- **Advanced Search**: Filter by location, trade, availability, ratings, and more
- **Mobile Responsive**: Optimized experience across all devices
- **Admin Dashboard**: Comprehensive platform management and analytics

## 🚀 Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Framer Motion** - Smooth animations

### **Backend & Database**
- **Next.js API Routes** - Server-side functionality
- **Prisma ORM** - Database management
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication system

### **External Services**
- **Resend** - Email delivery service
- **Twilio** - SMS verification
- **Stripe** - Payment processing (integration ready)
- **Google Maps API** - Location services

### **Deployment & DevOps**
- **Vercel** - Hosting and deployment
- **GitHub Actions** - CI/CD pipeline
- **ESLint & Prettier** - Code quality

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kenan3477/BuildHub.git
   cd BuildHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local` with:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/buildhub"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # Email (Resend)
   RESEND_API_KEY="your-resend-api-key"
   
   # SMS (Twilio)
   TWILIO_ACCOUNT_SID="your-account-sid"
   TWILIO_AUTH_TOKEN="your-auth-token"
   TWILIO_PHONE_NUMBER="+441234567890"
   
   # Maps
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-maps-api-key"
   ```

4. **Database Setup**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Pages & Features

### **Public Pages**
- **Homepage** (`/`) - Platform overview and hero section
- **Marketplace** (`/marketplace`) - Browse available jobs
- **Professionals** (`/professionals`) - Find verified contractors
- **Projects Map** (`/projects`) - Interactive UK jobs visualization

### **User Dashboard**
- **Dashboard** (`/dashboard`) - Personalized user hub
- **Post Job** (`/post-job`) - Create new project listings
- **My Jobs** (`/my-jobs`) - Manage active projects
- **Messages** (`/messages`) - Communication center
- **Builder Profile** (`/builder-profile`) - Professional profile management

### **Project Management**
- **Project Details** (`/project/[id]`) - Individual project pages
- **Submit Quote** (`/project/[id]/submit-quote`) - Contractor bidding
- **View Quotes** (`/project/[id]/quotes`) - Quote comparison

## 🏗️ Project Structure

```
BuildHub/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── marketplace/       # Job listings
│   │   ├── professionals/     # Contractor profiles
│   │   ├── projects/          # Project pages
│   │   └── ...               # Other pages
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Utility functions
│   │   ├── database.ts        # Database helpers
│   │   ├── lead-scoring.ts    # AI matching algorithm
│   │   ├── types.ts           # TypeScript definitions
│   │   └── utils.ts           # General utilities
│   └── contexts/              # React contexts
├── prisma/                    # Database schema & migrations
├── public/                    # Static assets
└── docs/                      # Documentation files
```

## 🔧 Configuration

### **Database Schema**
The platform uses a comprehensive PostgreSQL schema with:
- **Users**: Homeowners and contractors
- **Projects**: Job listings with detailed requirements
- **Quotes**: Contractor bids and proposals
- **Reviews**: Feedback and rating system
- **Messages**: Communication threads

### **Lead Scoring Algorithm**
Advanced matching system considering:
- Geographic proximity
- Skill compatibility
- Availability windows
- Historical performance
- Customer preferences

## 🚀 Deployment

### **Deploy to Vercel**
1. **Connect GitHub Repository**
   - Import project in Vercel dashboard
   - Connect to `https://github.com/Kenan3477/BuildHub`

2. **Configure Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - Ensure database is accessible from Vercel

3. **Deploy**
   - Automatic deployment on every push to main branch
   - Preview deployments for pull requests

### **Custom Domain**
Configure your custom domain in Vercel dashboard for production use.

## 📊 Analytics & Monitoring

- **User Analytics**: Track engagement and conversion metrics
- **Performance Monitoring**: Core Web Vitals and loading times
- **Error Tracking**: Comprehensive error logging and alerts
- **Business Intelligence**: Revenue, user growth, and market insights

## 🔐 Security Features

- **Data Protection**: GDPR compliant data handling
- **Authentication**: Secure user authentication with NextAuth.js
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: API endpoint protection
- **Professional Verification**: Multi-step contractor validation

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Documentation

- [Authentication System](./AUTHENTICATION-SYSTEM-DOCUMENTATION.md)
- [Email/SMS Setup](./EMAIL_SMS_SETUP.md)
- [Interactive Map Guide](./INTERACTIVE_MAP_GUIDE.md)
- [Professionals Page](./PROFESSIONALS-PAGE-DOCUMENTATION.md)
- [Admin Features](./ADMIN-LOGIN-COMPLETE.md)

## 🐛 Known Issues & Roadmap

### **Current Limitations**
- Payment integration pending Stripe setup
- Real-time messaging requires WebSocket implementation
- Mobile app development planned for Q2 2024

### **Upcoming Features**
- [ ] Video consultation booking
- [ ] Augmented reality project visualization
- [ ] AI-powered cost estimation
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)
- Maps powered by [Google Maps API](https://developers.google.com/maps)

---

**BuildHub** - Transforming the construction industry, one project at a time. 🏗️

For support, contact: support@buildhub.co.uk