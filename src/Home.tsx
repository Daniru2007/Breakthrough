import  { useEffect, useState } from 'react';
import { Globe, Brain, Eye, Ear, HandMetal, Sparkles, ArrowUp } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import { SubjectButton } from './components/SubjectButton';
import './Home.css';

function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update progress bar
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const subjects = [
    { name: 'MATHEMATICS', description: 'Interactive math learning with visual aids and step-by-step guidance' },
    { name: 'ICT', description: 'Computer skills adapted for different abilities and learning styles' },
    { name: 'GERMAN', description: 'Language learning with audio support and visual cues' },
    { name: 'ITALIAN', description: 'Engaging lessons with interactive exercises and clear pronunciation' },
    { name: 'PORTUGUESE', description: 'Cultural immersion with accessible learning materials' },
    { name: 'DUTCH', description: 'Progressive lessons adapted to individual learning pace' },
    { name: 'JAPANESE', description: 'Visual and audio-based learning of Japanese characters and sounds' }
  ];

  const navigate = useNavigate();

  return (
    <div>
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      
      <nav className="nav-container">
        <a href="/" className="logo">
          <Globe size={32} />
          BreakThrough
        </a>
        <div>
          <select className="button button-secondary">
            <option>ENGLISH</option>
          </select>
        </div>
      </nav>

      <section className="hero">
        <div className="globe">
          <Globe size={200} strokeWidth={1} />
        </div>
        <h1>The free, fun, and effective way to<br />learn a new skill!</h1>
        <button className="button button-primary" onClick={()=>navigate("/sign")}>GET STARTED</button>
        <div>
          <button className="button button-secondary" onClick={()=> navigate("/sign/login")}>I ALREADY HAVE AN ACCOUNT</button>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Our Subjects</h2>
        <div className="subjects-container">
          {subjects.map((subject) => (
            <SubjectButton 
              key={subject.name} 
              subject={subject.name}
              description={subject.description}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Why Choose BreakThrough?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Personalized Learning</h3>
            <p>Our adaptive technology adjusts to each student's unique needs and learning pace, ensuring everyone can succeed in their own way.</p>
          </div>
          <div className="feature-card">
            <h3>Inclusive Design</h3>
            <p>Every feature is designed with accessibility in mind, making learning possible for students with different abilities and learning styles.</p>
          </div>
          <div className="feature-card">
            <h3>Expert Support</h3>
            <p>Our team includes special education experts who ensure our content is both engaging and appropriate for all learners.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Accessibility Features</h2>
        <div className="accessibility-features">
          <div className="accessibility-card">
            <Eye size={32} />
            <h3>Visual Aids</h3>
            <p>High contrast modes and screen reader compatibility</p>
          </div>
          <div className="accessibility-card">
            <Ear size={32} />
            <h3>Audio Support</h3>
            <p>Text-to-speech and clear audio instructions</p>
          </div>
          <div className="accessibility-card">
            <HandMetal size={32} />
            <h3>Motor Skills</h3>
            <p>Switch access and alternative input methods</p>
          </div>
          <div className="accessibility-card">
            <Brain size={32} />
            <h3>Cognitive Support</h3>
            <p>Clear instructions and structured learning paths</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Success Stories</h2>
        <div className="testimonial">
          <img src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?auto=format&fit=crop&w=160&h=160" alt="Happy student" />
          <p className="testimonial-text">"BreakThrough has transformed how my child learns. The adaptive features and engaging content have made education accessible and fun!"</p>
          <p className="testimonial-author">Sarah's Parent</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Start Your Learning Journey</h2>
        <div className="feature-card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <Sparkles size={48} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
          <h3>Join Our Community</h3>
          <p>Begin your learning adventure today with our supportive community of learners and educators.</p>
          <button className="button button-primary" style={{ marginTop: '1rem' }}>Get Started Now</button>
        </div>
      </section>

      <button 
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}

export default Home;