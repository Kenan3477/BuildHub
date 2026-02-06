'use client'

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

export default function BuildHubHomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header - BuildHub Original Brand */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                width: '3rem', 
                height: '3rem', 
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Building style={{ height: '1.5rem', width: '1.5rem', color: 'white' }} />
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                  BuildHub
                  <span style={{ 
                    backgroundColor: '#10b981', 
                    color: 'white', 
                    fontSize: '0.6rem', 
                    padding: '0.125rem 0.375rem', 
                    borderRadius: '4px', 
                    marginLeft: '0.5rem',
                    fontWeight: '700'
                  }}>
                    LIVE
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>
                  Where Building Dreams Come True • UK's Leading Platform
                </div>
              </div>
            </div>
            
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              <a href="#marketplace" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Marketplace</a>
              <a href="/professionals" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Find Professionals</a>
              <a href="/auth/login" style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Post Project</a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <a href="/auth/login" style={{ fontSize: '0.9rem', color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Sign In</a>
                <a href="/auth/login" style={{ 
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)', 
                  color: 'white', 
                  fontSize: '0.9rem', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '6px', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Post Your Project
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div style={{ backgroundColor: '#667eea', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span>🔥 LIVE NOW: 47 projects posted in the last hour</span>
            <span>•</span>
            <span>Get matched in under 2 minutes!</span>
            <span>•</span>
            <a href="/professionals" style={{ color: '#fbbf24', textDecoration: 'underline' }}>
              <strong>Professionals: Join 18,000+ verified tradespeople earning £60K+ annually</strong>
            </a>
          </div>
        </div>
      </div>

      {/* BuildHub Marketplace Section */}
      <section id="marketplace" style={{ backgroundColor: '#f8fafc', padding: '5rem 1rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
              BuildHub Marketplace
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto' }}>
              Post your construction project with photos, budget, and requirements. Connect directly with verified professionals.
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            {/* Call to Action for Authenticated Project Posting */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🏗️</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
                Ready to Start Your Project?
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
                Join thousands of homeowners who have successfully completed their construction projects through BuildHub. Create your account to post projects and get matched with verified professionals.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <a 
                  href="/auth/login"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)', 
                    color: 'white', 
                    fontSize: '1.1rem', 
                    padding: '1rem 2.5rem', 
                    borderRadius: '8px', 
                    fontWeight: '700',
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                    transition: 'all 0.2s',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}
                >
                  Create Account & Post Project
                </a>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.9rem', color: '#6b7280', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                    <span>Verified professionals only</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                    <span>Secure & spam-free</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                    <span>Phone verification required</span>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#f0f9ff', 
                border: '1px solid #0ea5e9', 
                borderRadius: '8px', 
                padding: '1rem', 
                marginTop: '2rem',
                fontSize: '0.9rem',
                color: '#0369a1'
              }}>
                <strong>Why account verification?</strong> We require phone verification to ensure all projects are from real homeowners, preventing spam and fraudulent listings. This keeps our platform safe and trustworthy for everyone.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '3rem 1rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Building style={{ height: '1.5rem', width: '1.5rem', color: '#f59e0b' }} />
                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>BuildHub</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#d1d5db', lineHeight: '1.6' }}>
                The UK's leading platform connecting homeowners with verified construction professionals. 
                Build with confidence.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><a href="/professionals" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Browse All Professionals</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/auth/login" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Post a Project</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="#marketplace" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>How It Works</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/auth/login" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Join as Professional</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><a href="/help" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Help Centre</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/contact" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Contact Us</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/safety" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Safety Guidelines</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/trust" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Trust & Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><a href="/about" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>About BuildHub</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/careers" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Careers</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/press" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Press & Media</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/investors" style={{ color: '#d1d5db', textDecoration: 'none', fontWeight: '500' }}>Investor Relations</a></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                © 2024 BuildHub. All rights reserved. | VAT: GB123456789
              </div>
              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
                <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</a>
                <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: '500' }}>Terms of Service</a>
                <a href="/cookie-policy" style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: '500' }}>Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}