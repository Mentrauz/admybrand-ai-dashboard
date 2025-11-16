"use client"

import { useState, useEffect } from "react"
import { ArrowRight, BarChart3, Shield, Zap, TrendingUp, Users, Globe, ChevronDown, Menu, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Get instant insights into your digital marketing performance with live data visualization.",
      metric: "99.9%",
      label: "Uptime"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security ensures your marketing data is protected and compliant.",
      metric: "256-bit",
      label: "Encryption"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process millions of data points in seconds with our optimized analytics engine.",
      metric: "<100ms",
      label: "Response Time"
    },
    {
      icon: TrendingUp,
      title: "ROI Optimization",
      description: "AI-powered insights help you maximize your marketing ROI and campaign performance.",
      metric: "35%",
      label: "Avg ROI Increase"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights and collaborate with your team in real-time with powerful workspace tools.",
      metric: "10K+",
      label: "Active Users"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Monitor campaigns across multiple regions and time zones with unified dashboards.",
      metric: "150+",
      label: "Countries"
    }
  ]

  const stats = [
    { value: "500K+", label: "Data Points Processed Daily" },
    { value: "99.9%", label: "Accuracy Rate" },
    { value: "24/7", label: "Real-time Monitoring" },
    { value: "< 2s", label: "Dashboard Load Time" }
  ]

  return (
    <div className="min-h-screen bg-background">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-bounce-gentle {
          animation: bounce 2s infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse 2s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        
        .opacity-0 { opacity: 0; }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`text-2xl font-bold text-foreground transition-all duration-500 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
                  Analytics
                  <span className="text-muted-foreground ml-1">Insights</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className={`ml-10 flex items-baseline space-x-8 ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
                {/* <a href="#features" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 transform">
                  Features
                </a> */}
                {/* <a href="#analytics" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 transform">
                  Analytics
                </a> */}
                {/* <a href="#pricing" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 transform">
                  Pricing
                </a> */}
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
                    Get Started
                  </Button>
                </Link>
                {/* <Button size="sm" className="transition-all duration-200 hover:scale-105 hover:shadow-lg animate-pulse-gentle">
                  Get Started
                </Button> */}
              </div>
            </div>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="transition-all duration-200 hover:scale-110"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden border-t bg-card transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#features" className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium transition-all duration-200 hover:scale-105 hover:bg-accent/50 rounded-md">
              Features
            </a>
            <a href="#analytics" className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium transition-all duration-200 hover:scale-105 hover:bg-accent/50 rounded-md">
              Analytics
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium transition-all duration-200 hover:scale-105 hover:bg-accent/50 rounded-md">
              Pricing
            </a>
            <div className="px-3 py-2 space-y-2">
              <Link href="/dashboard" className="block">
                <Button variant="outline" size="sm" className="w-full transition-all duration-200 hover:scale-105">
                  Dashboard
                </Button>
              </Link>
              <Button size="sm" className="w-full transition-all duration-200 hover:scale-105">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <Badge variant="secondary" className={`mb-6 transition-all duration-500 hover:scale-105 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Analytics Platform
            </Badge>
            
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 ${isVisible ? 'animate-fadeInUp delay-100' : 'opacity-0'}`}>
              One-click for
              <br />
              <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Marketing Defense</span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed ${isVisible ? 'animate-fadeInUp delay-200' : 'opacity-0'}`}>
              Dive into the art of analytics, where innovative AI technology meets marketing expertise
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isVisible ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}>
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                  Open Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              {/* <Button size="lg" variant="outline" className="text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Discover More
              </Button> */}
            </div>
            
            {/* Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto ${isVisible ? 'animate-fadeInUp delay-400' : 'opacity-0'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 transition-colors duration-200 group-hover:text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground ${isVisible ? 'animate-fadeIn delay-500' : 'opacity-0'}`}>
          <div className="flex flex-col items-center space-y-2 animate-bounce-gentle">
            <span className="text-sm">Scroll down</span>
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fadeInUp">
              Powerful Features for Modern Marketing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fadeInUp delay-100">
              Everything you need to analyze, optimize, and scale your digital marketing efforts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`hover:bg-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-fadeInUp cursor-pointer`} style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-primary/80" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary">{feature.metric}</div>
                      <div className="text-xs text-muted-foreground">{feature.label}</div>
                    </div>
                  </div>
                  <CardTitle className="text-foreground text-xl transition-colors duration-200 group-hover:text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fadeInUp">
              Trusted by Marketing Teams
            </h2>
            <p className="text-xl text-muted-foreground animate-fadeInUp delay-100">
              See what our customers have to say about Analytics Insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeInUp delay-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 text-yellow-500 fill-current transition-transform duration-200 hover:scale-110`} style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Analytics Insights transformed how we approach data analysis. The AI-powered insights have helped us increase our ROI by 40%."
                </p>
                <div className="font-semibold text-foreground">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">Marketing Director, TechCorp</div>
              </CardContent>
            </Card>
            
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeInUp delay-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 text-yellow-500 fill-current transition-transform duration-200 hover:scale-110`} style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The real-time analytics and collaboration features have streamlined our entire marketing workflow. Couldn't be happier!"
                </p>
                <div className="font-semibold text-foreground">Michael Chen</div>
                <div className="text-sm text-muted-foreground">VP Marketing, GrowthCo</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fadeInUp">
            Ready to Transform Your Marketing Analytics?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fadeInUp delay-100">
            Join thousands of marketers who trust Analytics Insights for their data-driven decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-200">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
            {/* <Button size="lg" variant="outline" className="text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Schedule Demo
            </Button> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fadeInUp">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold text-foreground mb-4 transition-colors duration-200 hover:text-primary">
                Analytics
                <span className="text-muted-foreground ml-1">Insights</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                AI-Powered Analytics Dashboard for Digital Marketing Agencies. 
                Transform your data into actionable insights.
              </p>
            </div>
            <div className="animate-fadeInUp delay-100">
              <h3 className="text-foreground font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors duration-200 hover:scale-105 transform inline-block">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200 hover:scale-105 transform inline-block">Analytics</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200 hover:scale-105 transform inline-block">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200 hover:scale-105 transform inline-block">API</a></li>
              </ul>
            </div>
            <div className="animate-fadeInUp delay-200">
              <h3 className="text-foreground font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors duration-200 hover:scale-105 transform inline-block">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200 hover:scale-105 transform inline-block">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200 hover:scale-105 transform inline-block">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200 hover:scale-105 transform inline-block">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground animate-fadeInUp delay-300">
            <p>&copy; 2024 Analytics Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 