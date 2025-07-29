# AdMyBrand AI Dashboard 📊

A modern, AI-powered analytics dashboard for digital marketing agencies built with Next.js, TypeScript, and Tailwind CSS.

🌐 **Live Demo**: https://admybrand-ai-dashboard.vercel.app/

## ✨ Features

### 🎯 Core Analytics
- **Real-time KPI Tracking** - Revenue, users, conversions with live updates
- **Interactive Charts** - Line, bar, and pie charts with Recharts
- **Advanced Data Tables** - Sortable, filterable customer data with pagination
- **Responsive Design** - Mobile-first approach with dark/light themes

### 🎨 Modern UI/UX
- **shadcn/ui Components** - Professional component library
- **Smooth Animations** - Engaging user interactions
- **Theme Support** - Dark/light mode switching
- **Mobile Optimized** - Works seamlessly on all devices

### 📈 Dashboard Sections
- **Landing Page** - Professional marketing showcase
- **Analytics Dashboard** - Comprehensive metrics overview
- **Sidebar Navigation** - Easy access to different sections
- **Performance Metrics** - Visual performance indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/analytics-dashboard.git
cd analytics-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

## 📱 Project Structure

```
├── app/                  # Next.js App Router
│   ├── page.tsx         # Landing page
│   ├── dashboard/       # Dashboard pages
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── analytics-dashboard.tsx
│   ├── landing-page.tsx
│   └── ...
├── lib/                # Utilities
└── hooks/              # Custom React hooks
```

## 🎨 Key Components

### Landing Page
- Feature showcase with animations
- Professional marketing design
- Call-to-action sections

### Analytics Dashboard
- **KPI Cards**: Real-time metrics with trend indicators
- **Charts Section**: Multiple chart types with live data
- **Data Table**: Advanced filtering and sorting
- **Sidebar**: Navigation with theme toggle

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any future API integrations:

```bash
# Add your environment variables here
NEXT_PUBLIC_API_URL=your-api-url
```

### Customization
- **Colors**: Modify `tailwind.config.ts` for custom color schemes
- **Components**: Extend `components/ui/` for additional UI elements
- **Data**: Update mock data in component files for real data integration

## 📊 Demo Data

The dashboard currently uses mock data to demonstrate functionality:
- Revenue trends and user growth
- Traffic source breakdown
- Customer data with various metrics
- Performance indicators and KPIs

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source.

---

**Built with ❤️ using modern web technologies**

*Showcasing the power of Next.js, TypeScript, and AI-assisted development*
