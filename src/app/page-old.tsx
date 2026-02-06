import { 
  Search,
  Star,
  CheckCircle,
  ArrowRight,
  Hammer,
  Wrench,
  Zap,
  Home,
  Building,
  ShowerHead,
  ChefHat,
  Shield,
  MapPin,
  MessageSquare,
  Phone,
  Clock,
  Award,
  TrendingUp
} from "lucide-react"

// ProMatch - Original platform data
const tradeCategories = [
  { 
    name: "Kitchen Renovation", 
    slug: "kitchen", 
    icon: ChefHat, 
    count: "2,847",
    avgCost: "£12,500",
    topRated: true,
    urgency: "High demand"
  },
  { 
    name: "Bathroom Fitting", 
    slug: "bathroom", 
    icon: ShowerHead, 
    count: "1,923",
    avgCost: "£8,200",
    topRated: false,
    urgency: "Growing"
  },
  { 
    name: "Home Extension", 
    slug: "extension", 
    icon: Building, 
    count: "1,456",
    avgCost: "£28,900",
    topRated: true,
    urgency: "Premium"
  },
  { 
    name: "Electrical Work", 
    slug: "electrical", 
    icon: Zap, 
    count: "3,124",
    avgCost: "£850",
    topRated: false,
    urgency: "Emergency"
  },
  { 
    name: "Plumbing", 
    slug: "plumbing", 
    icon: Wrench, 
    count: "2,675",
    avgCost: "£450",
    topRated: false,
    urgency: "24/7 Available"
  },
  { 
    name: "Roofing", 
    slug: "roofing", 
    icon: Home, 
    count: "987",
    avgCost: "£6,800",
    topRated: true,
    urgency: "Weather-critical"
  }
]

const successStories = [
  {
    name: "Sarah M.",
    location: "Manchester",
    project: "Complete Kitchen Renovation",
    saving: "£3,200",
    quote: "ProMatch saved me thousands! Got 5 quotes instantly and hired the perfect team. My dream kitchen is finally reality!",
    rating: 5,
    image: "👩‍💼",
    timeframe: "Completed in 2 weeks"
  },
  {
    name: "David K.", 
    location: "Birmingham",
    project: "Loft Conversion",
    saving: "£8,500", 
    quote: "Couldn't believe how easy it was. Posted my project at 9am, had quotes by lunch. The quality matching system is brilliant!",
    rating: 5,
    image: "👨‍💻",
    timeframe: "Matched in 14 minutes"
  },
  {
    name: "Emma L.",
    location: "Leeds", 
    project: "Garden Landscaping",
    saving: "£1,800",
    quote: "Love the instant messaging feature! Could chat with contractors in real-time before deciding. So much better than other platforms.",
    rating: 5,
    image: "👩‍🎨",
    timeframe: "Project started next day"
  }
]

const platformFeatures = [
  {
    title: "Instant AI Matching",
    description: "Our smart algorithm analyzes your project requirements and instantly matches you with 3-5 perfect tradespeople in your area within 60 seconds.",
    icon: TrendingUp,
    benefit: "Save 95% of research time",
    color: "amber"
  },
  {
    title: "Real-Time Workspace",
    description: "Chat instantly with matched professionals, share photos, get live quotes, and track project progress all in one collaborative workspace.",
    icon: MessageSquare,
    benefit: "24/7 instant communication",
    color: "emerald"
  },
  {
    title: "Quality Guarantee System",
    description: "Every professional is verified, insured, and backed by our ProMatch Quality Guarantee with £10k project protection insurance.",
    icon: Shield,
    benefit: "100% satisfaction guaranteed",
    color: "violet"
  }
]

export default function ProMatchHomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header - ProMatch Original Brand */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                width: '3rem', 
                height: '3rem', 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
                position: 'relative'
              }}>
                <Hammer style={{ height: '1.5rem', width: '1.5rem', color: 'white' }} />
                <div style={{ 
                  position: 'absolute', 
                  top: '-4px', 
                  right: '-4px', 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: '#10b981', 
                  borderRadius: '50%',
                  border: '2px solid white'
                }}></div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: '800', 
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent' 
                  }}>
                    ProMatch
                  </span>
                  <div style={{ 
                    backgroundColor: '#10b981', 
                    color: 'white', 
                    fontSize: '0.625rem', 
                    fontWeight: '700', 
                    padding: '0.125rem 0.5rem', 
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    LIVE
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', letterSpacing: '0.025em' }}>
                  Instant Trade Connections • UK's #1 Platform
                </div>
              </div>
            </div>
            
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              <a href="/how-it-works" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>How ProMatch Works</a>
              <a href="/browse-professionals" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Browse Professionals</a>
              <a href="/success-stories" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Success Stories</a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <a href="/login" style={{ fontSize: '0.9rem', color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Sign In</a>
                <a href="/professional/join" style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', 
                  color: 'white', 
                  fontSize: '0.9rem', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '10px', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Join ProMatch Pro
                </a>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Live Activity Banner */}
        <div style={{ 
          background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)', 
          color: 'white', 
          textAlign: 'center', 
          padding: '1rem', 
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          🔥 LIVE NOW: 47 projects posted in the last hour • 
          <strong>Get matched in under 2 minutes!</strong> • 
          <a href="/professional/join" style={{ textDecoration: 'underline', marginLeft: '0.5rem', color: 'white', fontWeight: '700' }}>
            Professionals: Join 18,000+ verified tradespeople earning £60K+ annually
          </a>
        </div>
      </header>
  { 
    name: "Kitchen Renovation", 
    slug: "kitchen", 
    icon: ChefHat, 
    count: "2,847",
    avgCost: "£12,500",
    topRated: true
  },
  { 
    name: "Bathroom Fitting", 
    slug: "bathroom", 
    icon: ShowerHead, 
    count: "1,923",
    avgCost: "£8,200",
    topRated: false
  },
  { 
    name: "Home Extension", 
    slug: "extension", 
    icon: Building, 
    count: "1,456",
    avgCost: "£28,900",
    topRated: true
  },
  { 
    name: "Electrical Work", 
    slug: "electrical", 
    icon: Zap, 
    count: "3,124",
    avgCost: "£850",
    topRated: false
  },
  { 
    name: "Plumbing", 
    slug: "plumbing", 
    icon: Wrench, 
    count: "2,675",
    avgCost: "£450",
    topRated: false
  },
  { 
    name: "Roofing", 
    slug: "roofing", 
    icon: Home, 
    count: "987",
    avgCost: "£6,800",
    topRated: true
  }
]

const successStories = [
  {
    name: "Sarah M.",
    location: "Manchester",
    project: "Complete Kitchen Renovation",
    saving: "£3,200",
    quote: "ProMatch saved me thousands! Got 5 quotes instantly and hired the perfect team. My dream kitchen is finally reality!",
    rating: 5,
    image: "👩‍💼"
  },
  {
    name: "David K.", 
    location: "Birmingham",
    project: "Loft Conversion",
    saving: "£8,500", 
    quote: "Couldn't believe how easy it was. Posted my project at 9am, had quotes by lunch. The quality matching system is brilliant!",
    rating: 5,
    image: "👨‍💻"
  },
  {
    name: "Emma L.",
    location: "Leeds", 
    project: "Garden Landscaping",
    saving: "£1,800",
    quote: "Love the instant messaging feature! Could chat with contractors in real-time before deciding. So much better than other platforms.",
    rating: 5,
    image: "👩‍🎨"
  }
]

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header - Original ProMatch Design */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
              }}>
                <Hammer style={{ height: '1.25rem', width: '1.25rem', color: 'white' }} />
              </div>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  ProMatch
                </span>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Instant Trade Connections</div>
              </div>
            </div>
            
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <a href="/how-it-works" style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>How it Works</a>
              <a href="/browse" style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Browse Trades</a>
              <a href="/pricing" style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Pricing</a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a href="/login" style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Sign In</a>
                <a href="/tradesperson/join" style={{ 
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', 
                  color: 'white', 
                  fontSize: '0.875rem', 
                  padding: '0.625rem 1.25rem', 
                  borderRadius: '8px', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                  transition: 'all 0.2s'
                }}>
                  Join ProMatch
                </a>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Unique Value Banner */}
        <div style={{ 
          background: 'linear-gradient(90deg, #7c3aed 0%, #3b82f6 100%)', 
          color: 'white', 
          textAlign: 'center', 
          padding: '0.75rem', 
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          🚀 UK's Fastest Growing Trade Platform • 
          <strong> Get Instant Quotes in Under 10 Minutes!</strong> • 
          <a href="/tradesperson/join" style={{ textDecoration: 'underline', marginLeft: '0.5rem', color: 'white', fontWeight: '600' }}>
            Tradespeople: Join 15,000+ Professionals
          </a>
        </div>
      </header>

      {/* Hero Section - Unique Design */}
      <section style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #ddd6fe 100%)', 
        padding: '4rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              backgroundColor: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '50px', 
              fontSize: '0.875rem', 
              fontWeight: '600',
              color: '#7c3aed',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              marginBottom: '1rem'
            }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              Over 50,000 Projects Completed This Year
            </div>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: '800', 
            color: '#111827', 
            marginBottom: '1.5rem', 
            lineHeight: '1.1',
            maxWidth: '800px',
            margin: '0 auto 1.5rem auto'
          }}>
            Find Your Perfect Tradesperson in 
            <span style={{ 
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              display: 'block'
            }}>
              Minutes, Not Weeks
            </span>
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6b7280', 
            marginBottom: '2.5rem', 
            maxWidth: '600px', 
            margin: '0 auto 2.5rem auto',
            lineHeight: '1.6'
          }}>
            Revolutionary instant matching technology connects you with pre-verified, top-rated tradespeople. 
            Get competitive quotes, real-time chat, and guaranteed quality.
          </p>

          {/* Advanced Search */}
          <div style={{ maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              padding: '1rem', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="What project do you need help with? e.g. 'Kitchen renovation', 'Roof repair'..."
                    style={{ 
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem', 
                      fontSize: '1rem', 
                      border: '2px solid #f3f4f6', 
                      borderRadius: '12px', 
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      backgroundColor: '#f9fafb'
                    }}
                  />
                  <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Your postcode"
                    style={{ 
                      padding: '1rem 1rem 1rem 2.75rem', 
                      fontSize: '1rem', 
                      border: '2px solid #f3f4f6', 
                      borderRadius: '12px', 
                      outline: 'none',
                      backgroundColor: '#f9fafb',
                      minWidth: '140px'
                    }}
                  />
                  <MapPin style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
                </div>
                <button style={{ 
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: '12px', 
                  fontWeight: '600',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(124, 58, 237, 0.4)',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}>
                  Get Instant Quotes
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <span>🔥 Kitchen Renovation</span>
              <span>⚡ Emergency Repairs</span>
              <span>🏠 Home Extension</span>
              <span>🚿 Bathroom Fitting</span>
            </div>
          </div>

          {/* Trust Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827' }}>15,000+</div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Verified Tradespeople</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827' }}>4.9★</div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Average Rating</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827' }}>8 mins</div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Average Response</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827' }}>98%</div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Project Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How ProMatch Works - Unique Process */}
      <section style={{ backgroundColor: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
              How ProMatch Revolutionizes Trade Matching
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Our AI-powered system instantly connects you with the perfect tradespeople based on your specific needs, location, and budget.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)', 
                borderRadius: '20px', 
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(251, 191, 36, 0.2)'
              }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem auto',
                  boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)'
                }}>
                  <MessageSquare style={{ height: '2rem', width: '2rem', color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#92400e', marginBottom: '1rem' }}>
                  Instant AI Matching
                </h3>
                <p style={{ color: '#92400e', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Our smart algorithm analyzes your project and instantly matches you with 3-5 perfect tradespeople in your area.
                </p>
                <div style={{ 
                  backgroundColor: 'rgba(146, 64, 14, 0.1)', 
                  borderRadius: '8px', 
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#92400e'
                }}>
                  ⚡ Average match time: 47 seconds
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #d1fae5 0%, #10b981 100%)', 
                borderRadius: '20px', 
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)'
              }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: 'linear-gradient(135deg, #059669, #047857)', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem auto',
                  boxShadow: '0 8px 20px rgba(5, 150, 105, 0.4)'
                }}>
                  <Phone style={{ height: '2rem', width: '2rem', color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#065f46', marginBottom: '1rem' }}>
                  Real-Time Chat
                </h3>
                <p style={{ color: '#065f46', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Chat instantly with matched tradespeople, share photos, get quotes, and ask questions before deciding.
                </p>
                <div style={{ 
                  backgroundColor: 'rgba(6, 95, 70, 0.1)', 
                  borderRadius: '8px', 
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#065f46'
                }}>
                  💬 24/7 instant messaging
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #e0e7ff 0%, #7c3aed 100%)', 
                borderRadius: '20px', 
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)'
              }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: 'linear-gradient(135deg, #6d28d9, #5b21b6)', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem auto',
                  boxShadow: '0 8px 20px rgba(109, 40, 217, 0.4)'
                }}>
                  <Shield style={{ height: '2rem', width: '2rem', color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#581c87', marginBottom: '1rem' }}>
                  Guaranteed Quality
                </h3>
                <p style={{ color: '#581c87', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  All tradespeople are verified, insured, and backed by our ProMatch Quality Guarantee and £10k insurance.
                </p>
                <div style={{ 
                  backgroundColor: 'rgba(88, 28, 135, 0.1)', 
                  borderRadius: '8px', 
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#581c87'
                }}>
                  🛡️ 100% satisfaction guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trade Categories */}
      <section style={{ backgroundColor: '#f8fafc', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
              Most Popular Projects
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              Browse our top-rated categories with instant price estimates
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {tradeCategories.map((category) => (
              <div key={category.slug} style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '1.5rem', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {category.topRated && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    ⭐ Top Rated
                  </div>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <category.icon style={{ height: '1.5rem', width: '1.5rem', color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', marginBottom: '0.25rem' }}>
                      {category.name}
                    </h3>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {category.count} professionals available
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#7c3aed' }}>
                    From {category.avgCost}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>
                    ⚡ Instant quotes
                  </div>
                </div>
                
                <button style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  Get Instant Quotes →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section style={{ backgroundColor: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
              Real ProMatch Success Stories
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              See how ProMatch is transforming home improvement projects across the UK
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {successStories.map((story, index) => (
              <div key={index} style={{ 
                backgroundColor: '#f8fafc', 
                borderRadius: '20px', 
                padding: '2rem',
                border: '1px solid #e2e8f0',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ 
                    fontSize: '2.5rem',
                    width: '4rem',
                    height: '4rem',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    {story.image}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#111827', fontSize: '1.125rem' }}>{story.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{story.location} • {story.project}</div>
                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} style={{ height: '1rem', width: '1rem', fill: '#fbbf24', color: '#fbbf24' }} />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  background: 'linear-gradient(135deg, #10b981, #059669)', 
                  color: 'white', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px', 
                  display: 'inline-block', 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  💰 Saved {story.saving}
                </div>
                
                <blockquote style={{ 
                  fontSize: '1rem', 
                  color: '#374151', 
                  lineHeight: '1.6', 
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  "{story.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ 
        background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)', 
        padding: '4rem 1rem', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: 'white' }}>
            Ready to Transform Your Home?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: '#e0e7ff' }}>
            Join over 50,000 satisfied customers who've found their perfect tradespeople on ProMatch
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <button style={{ 
              backgroundColor: 'white', 
              color: '#7c3aed', 
              fontSize: '1.125rem', 
              padding: '1rem 3rem', 
              borderRadius: '12px', 
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              transition: 'all 0.3s'
            }}>
              🚀 Get Instant Quotes Now - It's Free!
            </button>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', fontSize: '0.875rem', color: '#e0e7ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle style={{ height: '1rem', width: '1rem' }} />
                100% Free to Use
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle style={{ height: '1rem', width: '1rem' }} />
                No Hidden Fees
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield style={{ height: '1rem', width: '1rem' }} />
                Quality Guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', 
                  borderRadius: '6px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Hammer style={{ height: '1rem', width: '1rem', color: 'white' }} />
                </div>
                <div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>ProMatch</span>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Instant Trade Connections</div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.6' }}>
                The UK's fastest-growing platform connecting homeowners with verified, top-rated tradespeople. 
                Get instant quotes, real-time chat, and guaranteed quality.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '600', color: 'white', marginBottom: '1rem' }}>For Homeowners</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#d1d5db' }}>
                <li style={{ marginBottom: '0.5rem' }}><a href="/get-quotes" style={{ color: '#d1d5db', textDecoration: 'none' }}>Get Instant Quotes</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/how-it-works" style={{ color: '#d1d5db', textDecoration: 'none' }}>How ProMatch Works</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/browse" style={{ color: '#d1d5db', textDecoration: 'none' }}>Browse All Trades</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/success-stories" style={{ color: '#d1d5db', textDecoration: 'none' }}>Success Stories</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/help" style={{ color: '#d1d5db', textDecoration: 'none' }}>Customer Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '600', color: 'white', marginBottom: '1rem' }}>For Tradespeople</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#d1d5db' }}>
                <li style={{ marginBottom: '0.5rem' }}><a href="/tradesperson/join" style={{ color: '#d1d5db', textDecoration: 'none' }}>Join ProMatch</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/tradesperson/pricing" style={{ color: '#d1d5db', textDecoration: 'none' }}>Pricing Plans</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/tradesperson/dashboard" style={{ color: '#d1d5db', textDecoration: 'none' }}>Professional Dashboard</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/tradesperson/support" style={{ color: '#d1d5db', textDecoration: 'none' }}>Pro Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '600', color: 'white', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#d1d5db' }}>
                <li style={{ marginBottom: '0.5rem' }}><a href="/about" style={{ color: '#d1d5db', textDecoration: 'none' }}>About ProMatch</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/careers" style={{ color: '#d1d5db', textDecoration: 'none' }}>Careers</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/press" style={{ color: '#d1d5db', textDecoration: 'none' }}>Press & Media</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/investors" style={{ color: '#d1d5db', textDecoration: 'none' }}>Investors</a></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: '#9ca3af' }}>
            <p>© 2026 ProMatch Ltd. All rights reserved. • Revolutionizing trade connections across the UK.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy</a>
              <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms</a>
              <a href="/cookies" style={{ color: '#9ca3af', textDecoration: 'none' }}>Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const jobCategories = [
  { name: "Kitchen", slug: "kitchen", icon: ChefHat },
  { name: "Bathroom", slug: "bathroom", icon: ShowerHead },
  { name: "Extension", slug: "extension", icon: Home },
  { name: "Roofing", slug: "roofing", icon: Building },
  { name: "Electrical", slug: "electrical", icon: Zap },
  { name: "Plumbing", slug: "plumbing", icon: Wrench },
  { name: "Painting", slug: "painting", icon: PaintBucket },
  { name: "Building", slug: "building", icon: Hammer },
]